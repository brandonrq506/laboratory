import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { IconButton, SortableItemCard } from "@/components/core";

import type { WrappedRoutineItem } from "@/features/tasks/types/scheduled-visible-item";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";

type RoutineGroupCardProps = {
  item: WrappedRoutineItem;
  expanded: boolean;
  isDraggingThisCard: boolean;
  onToggleExpanded: (applicationId: number) => void;
  onBulkDelete: (taskIds: number[]) => void;
  isOverlay?: boolean;
};

export const RoutineGroupCard = ({
  item,
  expanded,
  isDraggingThisCard,
  onToggleExpanded,
  onBulkDelete,
  isOverlay = false,
}: RoutineGroupCardProps) => {
  const showExpanded = expanded && !isDraggingThisCard && !isOverlay;
  const childrenContainerId = `wrap-${item.routine_application_id}-children`;
  const chevronLabel = showExpanded
    ? `Collapse ${item.routine_name}`
    : `Expand ${item.routine_name}`;

  const handleBulkDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onBulkDelete(item.absorbed_task_ids);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleExpanded(item.routine_application_id);
  };

  return (
    <SortableItemCard itemId={item.id} isOverlay={isOverlay}>
      <div className="grow">
        <p className="text-sm font-semibold">{item.routine_name}</p>
        <div className="flex gap-2.5 text-xs text-gray-600">
          <p>{item.absorbed_count} tasks</p>
          <p className="tabular-nums">
            {formatDatetimeTo12hTime(item.expected_start_time.toISOString())}
          </p>
          <div className="flex gap-1">
            <ClockIcon className="size-4" />
            <p className="tabular-nums">{secondsToTime(item.total_seconds)}</p>
          </div>
        </div>
      </div>
      <IconButton
        variant="dangerOutline"
        onClick={handleBulkDelete}
        aria-label={`Delete ${item.routine_name} routine`}>
        <TrashIcon aria-hidden className="size-5" />
      </IconButton>
      <IconButton
        aria-expanded={showExpanded}
        aria-controls={childrenContainerId}
        onClick={handleToggle}>
        {showExpanded ? (
          <ChevronDownIcon aria-hidden className="size-5" />
        ) : (
          <ChevronRightIcon aria-hidden className="size-5" />
        )}
        <span className="sr-only">{chevronLabel}</span>
      </IconButton>
    </SortableItemCard>
  );
};
