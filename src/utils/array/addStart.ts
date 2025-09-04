interface AddStartSignature {
  <T>(list: T[] | undefined, item: T): T[];
}

export const addStart: AddStartSignature = (list, item) =>
  list ? [item, ...list] : [item];
