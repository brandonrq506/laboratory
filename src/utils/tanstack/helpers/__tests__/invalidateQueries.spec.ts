import { QueryClient } from "@tanstack/react-query";

import { invalidateQueries } from "../invalidateQueries";

const createDeferred = () => {
  let resolve: () => void = () => undefined;
  const promise = new Promise<void>((promiseResolve) => {
    resolve = promiseResolve;
  });

  return { promise, resolve };
};

describe("invalidateQueries", () => {
  it("resolves after every query invalidation finishes", async () => {
    const firstInvalidation = createDeferred();
    const secondInvalidation = createDeferred();
    const queryClient = new QueryClient();
    const invalidateSpy = vi
      .spyOn(queryClient, "invalidateQueries")
      .mockReturnValueOnce(firstInvalidation.promise)
      .mockReturnValueOnce(secondInvalidation.promise);

    const invalidation = invalidateQueries(
      queryClient,
      { queryKey: ["first"] },
      { queryKey: ["second"] },
    );

    firstInvalidation.resolve();
    let isSettled = false;
    void invalidation.then(() => {
      isSettled = true;
    });
    await Promise.resolve();

    expect(isSettled).toBe(false);
    secondInvalidation.resolve();
    await invalidation;
    expect(isSettled).toBe(true);
    expect(invalidateSpy).toHaveBeenCalledTimes(2);
  });
});
