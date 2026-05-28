import type {
  PlainScheduledCard,
  ScheduledGroupedItem,
  WrappedRoutineCard,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";

import { CARD_TYPE } from "@/features/tasks/types/card-types";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

/**
 * Wrap rules — the algorithm below is parameterized by these four values.
 * They control when a routine application's tasks get collapsed into a single
 * wrap card (and when the rest of the list stays flat).
 */
/** Rule 1: minimum members in a group before wrapping is worth doing. */
export const MIN_TASKS_TO_WRAP = 2;
/** Rule 2: earliest grouped-list position the first member is allowed to sit at. */
export const WRAP_POINT = 4;
/** Rule 3: max foreign tasks tolerated in any single gap between members. */
export const WRAP_TOLERANCE = 1;
/** Rule 4: max total foreign tasks the wrap card can absorb in its span. */
export const MAX_ABSORBED_FOREIGN = 3;

/**
 * A set of scheduled tasks that share the same `routine_application.id` — i.e.
 * the output of one apply of one routine. Built once per render from the
 * scheduled-tasks list; never persisted.
 */
type RoutineGroup = {
  application_id: number;
  routine_name: string;
  /**
   * Positions of this group's members inside the input `tasks` array, in
   * ascending order. ONLY members — foreign tasks that happen to sit between
   * members (within the span) are not listed here; they live in the input
   * array at indices between these.
   *
   * Example: input tasks A B X C D (X is foreign), group {A,B,C,D} has
   * `member_indices = [0, 1, 3, 4]`. Index 2 (X) is in the span but not a
   * member.
   */
  member_indices: number[];
};

/**
 * Discover every routine application present in the input list and record the
 * positions of its members. Tasks with `routine_application = null` are
 * skipped. One distinct `routine_application.id` produces one group, even when
 * two groups share the same `routine_name`.
 */
const collectRoutineGroups = (
  tasks: readonly ScheduledTaskWithEST[],
): Map<number, RoutineGroup> => {
  const groups = new Map<number, RoutineGroup>();
  tasks.forEach((task, index) => {
    const application = task.routine_application;
    if (!application) return;
    const existing = groups.get(application.id);
    if (existing) {
      existing.member_indices.push(index);
      return;
    }
    groups.set(application.id, {
      application_id: application.id,
      routine_name: application.routine_name,
      member_indices: [index],
    });
  });
  return groups;
};

/**
 * Pivot the application-id-keyed map into a first-member-index-keyed map so
 * the walk can do an O(1) "does a group start at cursor?" check.
 */
const indexGroupsByFirstMember = (
  groups: ReadonlyMap<number, RoutineGroup>,
): ReadonlyMap<number, RoutineGroup> => {
  const indexed = new Map<number, RoutineGroup>();
  for (const group of groups.values()) {
    indexed.set(group.member_indices[0], group);
  }
  return indexed;
};

/** Raw-list index of the group's last member. */
const lastMemberIndex = (group: RoutineGroup): number =>
  group.member_indices[group.member_indices.length - 1];

/** Rule 1: group has enough members to be worth collapsing. */
const meetsMinimumSize = (group: RoutineGroup) => {
  return group.member_indices.length >= MIN_TASKS_TO_WRAP;
};

/**
 * Rule 2: first member is far enough down the grouped list that hiding it
 * doesn't obscure what the user is about to do.
 */
const meetsPositionThreshold = (firstMemberGroupedPosition: number) =>
  firstMemberGroupedPosition >= WRAP_POINT;

/**
 * Rule 3: no single gap between consecutive members exceeds the tolerance
 * (protects against one big foreign intrusion breaking the routine).
 */
const meetsGapTolerance = (group: RoutineGroup) =>
  group.member_indices
    .slice(1)
    .every(
      (current, i) => current - group.member_indices[i] - 1 <= WRAP_TOLERANCE,
    );

/**
 * Rule 4: total foreign tasks anywhere in the span is bounded (protects
 * against many small intrusions diluting the routine's identity).
 */
const meetsAbsorptionCap = (group: RoutineGroup): boolean => {
  const spanLength = lastMemberIndex(group) - group.member_indices[0] + 1;
  const foreignersInSpan = spanLength - group.member_indices.length;
  return foreignersInSpan <= MAX_ABSORBED_FOREIGN;
};

/** All four wrap rules must hold for a group to render as a wrapped card. */
const qualifiesForWrap = (
  group: RoutineGroup,
  firstMemberGroupedPosition: number,
): boolean =>
  meetsMinimumSize(group) &&
  meetsPositionThreshold(firstMemberGroupedPosition) &&
  meetsGapTolerance(group) &&
  meetsAbsorptionCap(group);

/**
 * Wrap a single scheduled task in the grouped-item discriminated union so it
 * can sit in the same output array as wrapped routine cards. This is the
 * "renders as a normal task card" branch — no grouping logic, just a kind tag.
 */
const buildPlainItem = (task: ScheduledTaskWithEST): PlainScheduledCard => ({
  kind: CARD_TYPE.TASK,
  id: task.id,
  task,
});

/**
 * Build the wrapped-card item for a group that has already passed
 * `qualifiesForWrap`. The card absorbs everything in the group's span —
 * members AND interleaved foreign tasks — because per the spec foreigners in
 * span are contextual additions to the routine block.
 */
const buildWrappedItem = (
  group: RoutineGroup,
  tasks: readonly ScheduledTaskWithEST[],
): WrappedRoutineCard => {
  const firstIndex = group.member_indices[0];
  const absorbedTasks = tasks.slice(firstIndex, lastMemberIndex(group) + 1);

  return {
    kind: CARD_TYPE.WRAP,
    id: wrapSortableId(group.application_id),
    routine_application_id: group.application_id,
    routine_name: group.routine_name,
    member_ids: group.member_indices.map((i) => tasks[i].id),
    absorbed_task_ids: absorbedTasks.map((t) => t.id),
    absorbed_tasks: absorbedTasks,
    total_seconds: absorbedTasks.reduce(
      (sum, t) => sum + t.activity.exp_seconds,
      0,
    ),
    expected_start_time: absorbedTasks[0].expected_start_time,
    absorbed_count: absorbedTasks.length,
  };
};

/**
 * Produce the grouped list ("grouped items") from the canonical scheduled
 * list. Walks tasks left-to-right; at each cursor position, if a routine
 * group starts there AND qualifies for wrapping at the current grouped
 * position, emit one wrapped card and skip past its span. Otherwise emit a
 * plain task and advance by one.
 *
 * "Grouped position" = 1-indexed position in the OUTPUT list (a wrapped card
 * counts as one slot, not N), which is what the wrap-point rule cares about.
 * Greedy outer-wins overlap behavior falls out naturally: once a wrap card
 * claims a span, the cursor jumps past it, so any inner routine starting
 * inside that span is never independently considered.
 */
const projectGroupedItems = (
  tasks: readonly ScheduledTaskWithEST[],
  groupsByFirstMemberIndex: ReadonlyMap<number, RoutineGroup>,
): ScheduledGroupedItem[] => {
  const items: ScheduledGroupedItem[] = [];
  let cursor = 0;

  while (cursor < tasks.length) {
    const group = groupsByFirstMemberIndex.get(cursor);
    const nextGroupedPosition = items.length + 1;

    if (group && qualifiesForWrap(group, nextGroupedPosition)) {
      items.push(buildWrappedItem(group, tasks));
      cursor = lastMemberIndex(group) + 1;
    } else {
      items.push(buildPlainItem(tasks[cursor]));
      cursor += 1;
    }
  }

  return items;
};

/**
 * Transform a flat scheduled-task list into the grouped-card list rendered by
 * the UI: routine application groups that satisfy the wrap rules become a
 * single wrapped card; everything else stays as a plain task. Pure function —
 * idempotent and re-derives wrap state from scratch on every call.
 */
export const groupRoutineTasks = (
  tasks: readonly ScheduledTaskWithEST[],
): ScheduledGroupedItem[] => {
  const groupsByFirstMember = indexGroupsByFirstMember(
    collectRoutineGroups(tasks),
  );
  return projectGroupedItems(tasks, groupsByFirstMember);
};
