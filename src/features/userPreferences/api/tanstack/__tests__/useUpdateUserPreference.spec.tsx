import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {
  savedThemePreference,
  userPreferences,
} from "@/test/store/userPreferences";
import type { ReactNode } from "react";
import { USER_PREFERENCE_KEY } from "../../../types/userPreferenceKeys";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";
import { useUpdateUserPreference } from "../useUpdateUserPreference";
import { userPreferencesOptions } from "../../queries";

const preferencesKey = userPreferencesOptions().queryKey;

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const makeWrapper =
  (queryClient: QueryClient) =>
  ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

const valueOf = (queryClient: QueryClient, key: string) =>
  queryClient.getQueryData(preferencesKey)?.find((pref) => pref.key === key)
    ?.value;

describe("useUpdateUserPreference", () => {
  it("rolls back only the failed preference, keeping a concurrent save", async () => {
    server.use(
      http.patch(`${apiRoutes.userPreferences}/theme`, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
      http.patch(`${apiRoutes.userPreferences}/show_remaining_time`, () =>
        HttpResponse.json({ ...savedThemePreference, value: "true" }),
      ),
    );
    const queryClient = buildQueryClient();
    queryClient.setQueryData(preferencesKey, userPreferences);

    const { result } = renderHook(() => useUpdateUserPreference(), {
      wrapper: makeWrapper(queryClient),
    });

    const failing = result.current
      .mutateAsync({ key: USER_PREFERENCE_KEY.THEME, value: "dark" })
      .catch(() => undefined);
    const succeeding = result.current.mutateAsync({
      key: USER_PREFERENCE_KEY.SHOW_REMAINING_TIME,
      value: "true",
    });

    await Promise.all([failing, succeeding]);

    await waitFor(() => {
      expect(valueOf(queryClient, USER_PREFERENCE_KEY.THEME)).toBe("light");
    });
    expect(valueOf(queryClient, USER_PREFERENCE_KEY.SHOW_REMAINING_TIME)).toBe(
      "true",
    );
  });

  it("drops a preference that did not exist before a failed save", async () => {
    server.use(
      http.patch(`${apiRoutes.userPreferences}/theme`, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );
    const withoutTheme = userPreferences.filter(
      (pref) => pref.key !== USER_PREFERENCE_KEY.THEME,
    );
    const queryClient = buildQueryClient();
    queryClient.setQueryData(preferencesKey, withoutTheme);

    const { result } = renderHook(() => useUpdateUserPreference(), {
      wrapper: makeWrapper(queryClient),
    });

    await result.current
      .mutateAsync({ key: USER_PREFERENCE_KEY.THEME, value: "dark" })
      .catch(() => undefined);

    await waitFor(() => {
      expect(valueOf(queryClient, USER_PREFERENCE_KEY.THEME)).toBeUndefined();
    });
  });
});
