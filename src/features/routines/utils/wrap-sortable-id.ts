import type { UniqueIdentifier } from "@dnd-kit/core";

export const wrapSortableId = (applicationId: number) =>
  `wrap:${applicationId}` as const;

export const isWrapSortableId = (
  id: UniqueIdentifier,
): id is `wrap:${number}` => typeof id === "string" && id.startsWith("wrap:");

export const parseWrapSortableId = (id: UniqueIdentifier): number | null => {
  if (!isWrapSortableId(id)) return null;
  const n = Number(id.slice(5));
  return Number.isFinite(n) ? n : null;
};
