interface RemoveById {
  <T extends { id: number | string }>(
    list: T[] | undefined,
    ...ids: T["id"][]
  ): T[];
}

export const removeById: RemoveById = (list, ...ids) => {
  if (!list) return [];
  const idSet = new Set(ids);
  return list.filter((item) => !idSet.has(item.id));
};
