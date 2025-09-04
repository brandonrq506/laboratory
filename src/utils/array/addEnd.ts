interface AddEndSignature {
  <T>(list: T[] | undefined, item: T): T[];
}

export const addEnd: AddEndSignature = (list, item) =>
  list ? [...list, item] : [item];
