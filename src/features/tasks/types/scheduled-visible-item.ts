import type { ScheduledTaskWithExpectedStartTime } from "@/features/tasks/types/scheduledTaskWithExpectedStartTime";

export type PlainScheduledItem = {
  kind: "task";
  id: number;
  task: ScheduledTaskWithExpectedStartTime;
};

export type WrappedRoutineItem = {
  kind: "wrap";
  id: `wrap:${number}`;
  routine_application_id: number;
  routine_name: string;
  member_ids: number[];
  absorbed_task_ids: number[];
  absorbed_tasks: ScheduledTaskWithExpectedStartTime[];
  total_seconds: number;
  expected_start_time: Date;
  absorbed_count: number;
};

export type ScheduledVisibleItem = PlainScheduledItem | WrappedRoutineItem;

export type ScheduledRenderItem =
  | PlainScheduledItem
  | WrappedRoutineItem
  | {
      kind: "expanded-child";
      id: number;
      task: ScheduledTaskWithExpectedStartTime;
      parent_routine_application_id: number;
    };
