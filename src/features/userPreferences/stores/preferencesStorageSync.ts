import { type QueryClient, hashKey } from "@tanstack/react-query";

import {
  getPreferencesFromLocalStorage,
  isPreferencesStorageEvent,
  savePreferencesToLocalStorage,
} from "../utils/localStorage";
import { userPreferencesOptions } from "../api/queries";

/*
  Local storage is a one-directional projection of the preferences cache. This is
  the only automatic writer, so the two cannot disagree; the pre-paint script in
  index.html and `placeholderData` are the only readers. A `storage` event never
  fires in the tab that wrote it, so the two directions cannot loop.
*/
export const startPreferencesStorageSync = (client: QueryClient) => {
  const queryKey = userPreferencesOptions().queryKey;
  const queryHash = hashKey(queryKey);

  const unsubscribeCache = client.getQueryCache().subscribe((event) => {
    /*
      Removals are ignored so signing out cannot resurrect the entry between
      `removeQueries` and `clearPreferencesFromLocalStorage`, and so cache
      eviction never decides what the next cold start paints.
    */
    if (event.query.queryHash !== queryHash || event.type === "removed") return;

    const preferences = client.getQueryData(queryKey);
    if (preferences) savePreferencesToLocalStorage(preferences);
  });

  const onStorage = (event: StorageEvent) => {
    if (!isPreferencesStorageEvent(event)) return;

    /*
      Another tab saved a preference. A cleared entry is that tab signing out,
      which owns its own session teardown, so only real values propagate.
    */
    const preferences = getPreferencesFromLocalStorage();
    if (preferences) client.setQueryData(queryKey, preferences);
  };

  window.addEventListener("storage", onStorage);

  return () => {
    unsubscribeCache();
    window.removeEventListener("storage", onStorage);
  };
};
