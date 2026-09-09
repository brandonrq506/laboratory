import { HttpResponse, http } from "msw";
import {
  darkUserPreferences,
  savedThemePreference,
  userPreferences,
} from "@/test/store/userPreferences";
import { render, screen, waitFor } from "@/test/test-utils";
import { ThemeSelect } from "../ThemeSelect";
import type { UserPreferenceModel } from "../../types/userPreferenceModel";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { mockUserPreferencesResponse } from "@/test/handlers/userPreference";
import { server } from "@/test/server";
import userEvent from "@testing-library/user-event";

// This suite runs in the DOM project, which does not start MSW globally.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());

beforeEach(() => localStorage.clear());
afterEach(() => server.resetHandlers());

const themeSelector = () => screen.getByRole("button", { name: "Theme" });

describe("account theme selection", () => {
  it("shows the saved account preference", async () => {
    server.use(
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(darkUserPreferences),
      ),
    );

    render(<ThemeSelect />);

    await waitFor(() => expect(themeSelector()).toHaveTextContent("Dark"));
  });

  it("saves immediately and blocks overlapping changes", async () => {
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
        UserPreferenceModel
      >(`${apiRoutes.userPreferences}/theme`, async () => {
        await response.promise;
        return HttpResponse.json({ ...savedThemePreference, value: "dark" });
      }),
    );

    render(<ThemeSelect />);
    await waitFor(() => expect(themeSelector()).toBeEnabled());

    await user.click(themeSelector());
    await user.click(screen.getByRole("option", { name: "Dark" }));

    expect(themeSelector()).toBeDisabled();
    expect(themeSelector()).toHaveTextContent("Dark");

    response.resolve();

    await waitFor(() => expect(themeSelector()).toBeEnabled());
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("restores the previous preference after a failed save", async () => {
    const user = userEvent.setup();
    server.use(
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(userPreferences),
      ),
      http.patch(
        `${apiRoutes.userPreferences}/theme`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    render(<ThemeSelect />);
    await waitFor(() => expect(themeSelector()).toBeEnabled());

    await user.click(themeSelector());
    await user.click(screen.getByRole("option", { name: "Dark" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your previous theme was restored",
    );
    await waitFor(() => expect(themeSelector()).toHaveTextContent("Light"));
  });

  it("reports a failed load", async () => {
    server.use(
      http.get(
        apiRoutes.userPreferences,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    render(<ThemeSelect />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not load theme preference",
    );
  });
});
