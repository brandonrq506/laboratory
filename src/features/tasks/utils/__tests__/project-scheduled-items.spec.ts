import type {
  PlainScheduledCard,
  ScheduledGroupedItem,
  ScheduledRenderItem,
  WrappedRoutineCard,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { ExpandedGroupMap } from "@/features/tasks/types/expanded-group-map";
import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";

import { CARD_TYPE } from "@/features/tasks/types/card-types";
import { projectScheduledItems } from "../project-scheduled-items";
import { scheduledTasks } from "@/test/store/tasks";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

const APP_A = 1;
const APP_B = 2;

const buildTask = (id: number): ScheduledTaskWithEST => ({
  ...scheduledTasks[0],
  id,
  expected_start_time: new Date(id),
});

const buildPlain = (id: number): PlainScheduledCard<ScheduledTaskWithEST> => ({
  kind: CARD_TYPE.TASK,
  id,
  task: buildTask(id),
});

const buildWrap = (
  applicationId: number,
  taskIds: number[],
): WrappedRoutineCard<ScheduledTaskWithEST> => ({
  kind: CARD_TYPE.WRAP,
  id: wrapSortableId(applicationId),
  routine_application_id: applicationId,
  routine_name: `Routine ${applicationId}`,
  member_ids: taskIds,
  absorbed_task_ids: taskIds,
  absorbed_tasks: taskIds.map(buildTask),
  total_seconds: 0,
});

const expansionOf = (...applicationIds: number[]): ExpandedGroupMap =>
  new Map(applicationIds.map((id) => [id, true]));

const wrapA = buildWrap(APP_A, [10, 11]);
const wrapB = buildWrap(APP_B, [20, 21]);

// P1 P2 P3 [A: 10 11] P4 [B: 20 21]
const grouped: ScheduledGroupedItem<ScheduledTaskWithEST>[] = [
  buildPlain(1),
  buildPlain(2),
  buildPlain(3),
  wrapA,
  buildPlain(4),
  wrapB,
];

const ids = (items: ScheduledRenderItem<ScheduledTaskWithEST>[]) =>
  items.map((i) => i.id);

const expandedOf = (
  items: ScheduledRenderItem<ScheduledTaskWithEST>[],
  applicationId: number,
) => {
  const wrap = items.find((i) => i.id === wrapSortableId(applicationId));
  if (wrap?.kind !== CARD_TYPE.WRAP) throw new Error("wrap not found");
  return wrap.expanded;
};

describe("projectScheduledItems", () => {
  it("collapsed wraps emit no children and report expanded: false", () => {
    const result = projectScheduledItems(grouped, expansionOf(), null);

    expect(ids(result)).toEqual([1, 2, 3, wrapA.id, 4, wrapB.id]);
    expect(expandedOf(result, APP_A)).toBe(false);
    expect(expandedOf(result, APP_B)).toBe(false);
  });

  it("an expanded wrap emits its absorbed tasks, in order, right after it", () => {
    const result = projectScheduledItems(grouped, expansionOf(APP_A), null);

    expect(ids(result)).toEqual([1, 2, 3, wrapA.id, 10, 11, 4, wrapB.id]);
    expect(result.slice(4, 6).map((i) => i.kind)).toEqual([
      CARD_TYPE.EXPANDED_CHILD,
      CARD_TYPE.EXPANDED_CHILD,
    ]);
    expect(expandedOf(result, APP_A)).toBe(true);
    expect(expandedOf(result, APP_B)).toBe(false);
  });

  it("two expanded wraps each emit their own children", () => {
    const result = projectScheduledItems(
      grouped,
      expansionOf(APP_A, APP_B),
      null,
    );

    expect(ids(result)).toEqual([
      1,
      2,
      3,
      wrapA.id,
      10,
      11,
      4,
      wrapB.id,
      20,
      21,
    ]);
  });

  it("the dragged wrap renders collapsed without children; other groups are unaffected", () => {
    const expansion = expansionOf(APP_A, APP_B);
    const idle = projectScheduledItems(grouped, expansion, null);

    const dragging = projectScheduledItems(grouped, expansion, wrapA.id);

    expect(ids(dragging)).toEqual([1, 2, 3, wrapA.id, 4, wrapB.id, 20, 21]);
    expect(expandedOf(dragging, APP_A)).toBe(false);
    expect(expandedOf(dragging, APP_B)).toBe(true);
    // Drop / cancel clears draggingId → expanded output is restored.
    expect(projectScheduledItems(grouped, expansion, null)).toEqual(idle);
  });

  it.each([
    ["a plain task", 1],
    ["an expanded child", 10],
  ])("dragging %s leaves expansion alone", (_label, draggingId) => {
    const expansion = expansionOf(APP_A, APP_B);

    expect(projectScheduledItems(grouped, expansion, draggingId)).toEqual(
      projectScheduledItems(grouped, expansion, null),
    );
  });

  it("carries grouped fields onto the render wrap and passes input objects through by reference", () => {
    const result = projectScheduledItems(grouped, expansionOf(APP_A), null);
    const [plain, , , wrap, firstChild, secondChild] = result;

    expect(plain).toBe(grouped[0]);
    expect(wrap).toEqual({ ...wrapA, expanded: true });
    if (
      firstChild.kind !== CARD_TYPE.EXPANDED_CHILD ||
      secondChild.kind !== CARD_TYPE.EXPANDED_CHILD
    ) {
      throw new Error("expected expanded children");
    }
    expect(firstChild.task).toBe(wrapA.absorbed_tasks[0]);
    expect(secondChild.task).toBe(wrapA.absorbed_tasks[1]);
    // Compiles only because T (ScheduledTaskWithEST) survives projection.
    expect(firstChild.task.expected_start_time).toBe(
      wrapA.absorbed_tasks[0].expected_start_time,
    );
  });
});
