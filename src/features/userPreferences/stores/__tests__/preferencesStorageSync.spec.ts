import {
  clearPreferencesFromLocalStorage,
  getPreferencesFromLocalStorage,
  savePreferencesToLocalStorage,
} from "../../utils/localStorage";
import {
  darkUserPreferences,
  userPreferences,
} from "@/test/store/userPreferences";
import { QueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { http } from "msw";
import { mockUserPreferencesResponse } from "@/test/handlers/userPreference";
import { server } from "@/test/server";
import { startPreferencesStorageSync } from "../preferencesStorageSync";
import { userPreferencesOptions } from "../../api/queries";

let client: QueryClient;
let stopSync: () => void;

const preferencesKey = userPreferencesOptions().queryKey;

beforeEach(() => {
  localStorage.clear();
  client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  stopSync = startPreferencesStorageSync(client);
});
afterEach(() => {
  stopSync();
  client.clear();
});

describe("preferences storage projection", () => {
  it("mirrors fetched preferences so the next cold start can read them", async () => {
    server.use(
      http.get(apiRoutes.userPreferences, () =>
        mockUserPreferencesResponse(darkUserPreferences),
      ),
    );

    await client.fetchQuery(userPreferencesOptions());

    expect(getPreferencesFromLocalStorage()).toEqual(darkUserPreferences);
  });

  it("mirrors an optimistic change before the server responds", () => {
    client.setQueryData(preferencesKey, userPreferences);

    client.setQueryData(preferencesKey, darkUserPreferences);

    expect(getPreferencesFromLocalStorage()).toEqual(darkUserPreferences);
  });

  it("mirrors a rollback so a failed save is not persisted", () => {
    client.setQueryData(preferencesKey, darkUserPreferences);

    client.setQueryData(preferencesKey, userPreferences);

    expect(getPreferencesFromLocalStorage()).toEqual(userPreferences);
  });

  it("does not restore the entry when a fetch resolves after signing out", async () => {
    const started = createDeferred<void>();
    const response = createDeferred<void>();
    server.use(
      http.get(apiRoutes.userPreferences, async () => {
        started.resolve();
        await response.promise;
        return mockUserPreferencesResponse(darkUserPreferences);
      }),
    );

    const request = client
      .fetchQuery(userPreferencesOptions())
      .catch((error: unknown) => error);
    await started.promise;

    client.removeQueries({ queryKey: preferencesKey });
    clearPreferencesFromLocalStorage();
    response.resolve();
    await request;

    expect(getPreferencesFromLocalStorage()).toBeUndefined();
  });

  it("adopts a preference saved by another tab", () => {
    client.setQueryData(preferencesKey, userPreferences);
    savePreferencesToLocalStorage(darkUserPreferences);

    window.dispatchEvent(new StorageEvent("storage", { key: "preferences" }));

    expect(client.getQueryData(preferencesKey)).toEqual(darkUserPreferences);
  });

  it("stops mirroring once disposed", () => {
    stopSync();

    client.setQueryData(preferencesKey, darkUserPreferences);

    expect(getPreferencesFromLocalStorage()).toBeUndefined();
  });
});
