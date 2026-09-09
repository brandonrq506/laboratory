import { HttpResponse, http } from "msw";
import {
  darkUserPreferences,
  savedThemePreference,
  systemUserPreferences,
  userPreferences,
} from "@/test/store/userPreferences";
import {
  initializeTheme,
  setThemePreference,
  setThemeSaving,
} from "../../stores/theme-store";
import { render, screen, waitFor } from "@/test/test-utils";
import { ThemeSelect } from "../ThemeSelect";
import type { UserPreferenceModel } from "../../types/userPreferenceModel";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { mockSystemTheme } from "@/test/utils/mock-system-theme";
import { mockUserPreferencesResponse } from "@/test/handlers/userPreference";
import { server } from "@/test/server";
import userEvent from "@testing-library/user-event";

let dispose: () => void;
let system: ReturnType<typeof mockSystemTheme>;

// This suite runs in the DOM project, which does not start MSW globally.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());

beforeEach(() => {
  localStorage.clear();
  system = mockSystemTheme();
  setThemeSaving(false);
  dispose = initializeTheme();
});
afterEach(() => {
  dispose();
  server.resetHandlers();
  system.restore();
});

describe("account theme selection", () => {
  it("loads the account preference over the startup cache", async () => {
    server.use(
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(darkUserPreferences),
      ),
    );
    setThemePreference("light");

    render(<ThemeSelect />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Theme" })).toHaveTextContent(
        "Dark",
      ),
    );

    expect(document.documentElement).toHaveStyle({ colorScheme: "dark" });
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("saves immediately, disables overlapping changes, and persists through refetch", async () => {
    const user = userEvent.setup();
    const response = createDeferred<void>();
    server.use(
      http.get(
        apiRoutes.userPreferences,
        () => mockUserPreferencesResponse(userPreferences),
        { once: true },
      ),
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(darkUserPreferences),
      ),
      http.patch<
        never,
        Pick<UserPreferenceModel, "value">,
        UserPreferenceModel | { error: string }
      >(`${apiRoutes.userPreferences}/theme`, async ({ request }) => {
        const body = await request.json();

        if (body.value !== "dark") {
          return HttpResponse.json(
            { error: "Expected dark theme" },
            { status: 422 },
          );
        }

        await response.promise;

        return HttpResponse.json({ ...savedThemePreference, value: "dark" });
      }),
    );

    render(<ThemeSelect />);

    const selector = screen.getByRole("button", { name: "Theme" });
    await waitFor(() => expect(selector).toBeEnabled());

    await user.click(selector);
    await user.click(screen.getByRole("option", { name: "Dark" }));

    expect(selector).toBeDisabled();
    expect(document.documentElement).toHaveStyle({ colorScheme: "dark" });
    expect(localStorage.getItem("theme")).toBe("dark");

    response.resolve();

    await waitFor(() => expect(selector).toBeEnabled());
    expect(selector).toHaveTextContent("Dark");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("preferences")!)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "theme", value: "dark" }),
      ]),
    );
  });

  it("restores the previous appearance and both caches after a failed save", async () => {
    const user = userEvent.setup();
    server.use(
      http.patch(
        `${apiRoutes.userPreferences}/theme`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    render(<ThemeSelect />);

    const selector = screen.getByRole("button", { name: "Theme" });
    await waitFor(() => expect(selector).toBeEnabled());

    await user.click(selector);
    await user.click(screen.getByRole("option", { name: "Dark" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your previous theme was restored",
    );
    await waitFor(() => expect(selector).toBeEnabled());

    expect(document.documentElement).toHaveStyle({ colorScheme: "light" });
    expect(selector).toHaveTextContent("Light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(JSON.parse(localStorage.getItem("preferences")!)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "theme", value: "light" }),
      ]),
    );
  });

  it("saves System and follows device appearance without changing the preference", async () => {
    const user = userEvent.setup();
    server.use(
      http.get(
        apiRoutes.userPreferences,
        () => mockUserPreferencesResponse(userPreferences),
        { once: true },
      ),
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(systemUserPreferences),
      ),
      http.patch<
        never,
        Pick<UserPreferenceModel, "value">,
        UserPreferenceModel | { error: string }
      >(`${apiRoutes.userPreferences}/theme`, async ({ request }) => {
        const body = await request.json();

        if (body.value !== "system") {
          return HttpResponse.json(
            { error: "Expected system theme" },
            { status: 422 },
          );
        }

        return HttpResponse.json({ ...savedThemePreference, value: "system" });
      }),
    );

    render(<ThemeSelect />);

    const selector = screen.getByRole("button", { name: "Theme" });
    await waitFor(() => expect(selector).toBeEnabled());

    await user.click(selector);
    await user.click(screen.getByRole("option", { name: "System" }));

    await waitFor(() => expect(selector).toHaveTextContent("System"));
    await waitFor(() => expect(selector).toBeEnabled());

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    system.setDark(true);

    expect(document.documentElement).toHaveStyle({ colorScheme: "dark" });
    expect(localStorage.getItem("theme")).toBe("system");

    system.setDark(false);

    expect(document.documentElement).toHaveStyle({ colorScheme: "light" });
    expect(localStorage.getItem("theme")).toBe("system");
  });
});
