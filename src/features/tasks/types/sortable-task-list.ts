import type { UniqueIdentifier } from "@dnd-kit/core";

export type SortableId = UniqueIdentifier;

export interface SortableListItem {
  id: string | number;
}

export interface OnDragEndArgs<T extends SortableListItem> {
  itemId: T["id"];
  prevItemId: T["id"] | null;
  nextItemId: T["id"] | null;
  items: T[];
}

export interface SortableTaskListProps<T extends SortableListItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderOverlay?: (item: T) => React.ReactNode;
  onDragStart?: (id: T["id"]) => void;
  onDragEnd: (args: OnDragEndArgs<T>) => void;
  onDragCancel?: (id: T["id"]) => void;
}
