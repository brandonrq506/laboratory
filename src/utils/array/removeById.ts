interface RemoveById {
  <T extends { id: number | string }>(list: T[] | undefined, id: T["id"]): T[];
}

export const removeById: RemoveById = (list, id) =>
  list ? list.filter((item) => item.id !== id) : [];
