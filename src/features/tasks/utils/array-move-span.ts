export const arrayMoveSpan = <T extends { id: number }>(
  items: T[],
  spanIds: ReadonlySet<number>,
  destIndexInRest: number,
): T[] => {
  const span: T[] = [];
  const rest: T[] = [];
  for (const item of items) {
    if (spanIds.has(item.id)) span.push(item);
    else rest.push(item);
  }
  const insertAt = Math.max(0, Math.min(destIndexInRest, rest.length));
  return [...rest.slice(0, insertAt), ...span, ...rest.slice(insertAt)];
};
