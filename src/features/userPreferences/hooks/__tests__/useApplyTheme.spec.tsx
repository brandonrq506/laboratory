import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import type { UserPreference } from "../../types/userPreference";
import { mockSystemTheme } from "@/test/utils/mock-system-theme";
import { useApplyTheme } from "../useApplyTheme";
import { userPreferences } from "@/test/store/userPreferences";
import { userPreferencesOptions } from "../../api/queries";

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const makeWrapper =
  (queryClient: QueryClient) =>
  ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

const withTheme = (value: string): UserPreference[] =>
  userPreferences.map((pref) =>
    pref.key === "theme" ? { ...pref, value } : pref,
  );

const renderWithTheme = (value: string) => {
  const queryClient = buildQueryClient();
  queryClient.setQueryData(userPreferencesOptions().queryKey, withTheme(value));

  return renderHook(() => useApplyTheme(), {
    wrapper: makeWrapper(queryClient),
  });
};

const root = () => document.documentElement;

let system: ReturnType<typeof mockSystemTheme>;

beforeEach(() => {
  localStorage.clear();
  root().className = "";
  root().style.removeProperty("color-scheme");
  document.head.innerHTML = '<meta name="theme-color" content="#f9fafb">';
  system = mockSystemTheme();
});
afterEach(() => system.restore());

describe("useApplyTheme", () => {
  it("applies an explicit dark preference to the document", () => {
    renderWithTheme("dark");

    expect(root()).toHaveClass("dark");
    expect(root().style.colorScheme).toBe("dark");
  });

  it("removes a previously applied dark appearance", () => {
    root().classList.add("dark");
    root().style.colorScheme = "dark";

    renderWithTheme("light");

    expect(root()).not.toHaveClass("dark");
    expect(root().style.colorScheme).toBe("light");
  });

  it("follows the device while the preference is System", () => {
    system.setDark(true);

    renderWithTheme("system");

    expect(root()).toHaveClass("dark");

    act(() => system.setDark(false));

    expect(root()).not.toHaveClass("dark");
  });

  it("falls back to light when the account has no usable theme", () => {
    system.setDark(true);
    const queryClient = buildQueryClient();
    queryClient.setQueryData(userPreferencesOptions().queryKey, []);

    renderHook(() => useApplyTheme(), { wrapper: makeWrapper(queryClient) });

    expect(root()).not.toHaveClass("dark");
    expect(root().style.colorScheme).toBe("light");
  });
});
