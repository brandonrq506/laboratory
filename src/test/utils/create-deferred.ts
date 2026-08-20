export const createDeferred = <T>() => {
  let resolvePromise: (value: T | PromiseLike<T>) => void = () => {};

  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });

  return { promise, resolve: resolvePromise };
};
