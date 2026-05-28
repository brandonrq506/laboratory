import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";

import { IconButton } from "@/components/core";
import { QuickDeleteRoutineGroup } from "./quick-delete-routine-group";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";

import type { WrappedRoutineCard } from "@/features/tasks/types/scheduled-grouped-card";

type Props = {
  item: WrappedRoutineCard;
  expanded?: boolean;
  onToggleExpanded?: (applicationId: number) => void;
};

export const RoutineGroupContent = ({
  item,
  expanded = false,
  onToggleExpanded,
}: Props) => {
  const childrenContainerId = `wrap-${item.routine_application_id}-children`;
  const chevronLabel = expanded
    ? `Collapse ${item.routine_name}`
    : `Expand ${item.routine_name}`;

  const handleToggle = () => onToggleExpanded?.(item.routine_application_id);

  return (
    <Fragment>
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
      <QuickDeleteRoutineGroup
        taskIds={item.absorbed_task_ids}
        routineName={item.routine_name}
      />
      <IconButton
        aria-expanded={expanded}
        aria-controls={childrenContainerId}
        onClick={handleToggle}>
        {expanded ? (
          <ChevronDownIcon aria-hidden className="size-5" />
        ) : (
          <ChevronRightIcon aria-hidden className="size-5" />
        )}
        <span className="sr-only">{chevronLabel}</span>
      </IconButton>
    </Fragment>
  );
};
