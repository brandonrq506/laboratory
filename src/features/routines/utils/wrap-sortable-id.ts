import type { UniqueIdentifier } from "@dnd-kit/core";
import type { WrapCardSortableId } from "@/types/routines";

export const PREFIX = "wrap:" as const;

export const wrapSortableId = (
  routine_application_id: number,
): WrapCardSortableId => {
  return `${PREFIX}${routine_application_id}`;
};

export const isWrapSortableId = (
  id: UniqueIdentifier,
): id is WrapCardSortableId => {
  if (typeof id !== "string" || !id.startsWith(PREFIX)) return false;

  const routine_application_id = id.slice(PREFIX.length);

  if (routine_application_id === "") return false;

  return Number.isInteger(Number(routine_application_id));
};

export const parseWrapSortableId = (id: UniqueIdentifier) => {
  if (!isWrapSortableId(id)) return null;

  return Number(id.slice(PREFIX.length));
};
