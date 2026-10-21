import { planSingleMove, planSpanMove } from "@/features/tasks/utils/plan-move";
import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import {
  routineApplication,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const makeTask = (id: number): ScheduledTaskAPI => ({
  ...scheduledTasks[0],
  id,
});

const inApplication = (
  id: number,
  applicationId: number,
): ScheduledTaskAPI => ({
  ...withApplication(makeTask(id)),
  routine_application: { ...routineApplication, id: applicationId },
});

const ids = (tasks: readonly ScheduledTaskAPI[]) => tasks.map((t) => t.id);

// Grouped list: 1, 2, [wrap A: 3 4], [wrap B: 5 6], 7
const rawItems = [
  makeTask(1),
  makeTask(2),
  inApplication(3, 100),
  inApplication(4, 100),
  inApplication(5, 200),
  inApplication(6, 200),
  makeTask(7),
];
const groupedItems = groupRoutineTasks(rawItems);
const wrapA = wrapSortableId(100);
const wrapB = wrapSortableId(200);

describe("plan-move", () => {
  describe("planSingleMove", () => {
    it("drops a task right below a collapsed routine group after the group's last member", () => {
      const plan = planSingleMove(rawItems, groupedItems, 1, wrapA);

      expect(plan).not.toBeNull();
      expect(ids(plan!.nextRaw)).toEqual([2, 3, 4, 1, 5, 6, 7]);
      expect(plan).toMatchObject({
        taskId: 1,
        prevTaskId: 4,
        nextTaskId: 5,
      });
    });

    it("drops a task to the top when there is no previous item", () => {
      const plan = planSingleMove(rawItems, groupedItems, 7, null);

      expect(ids(plan!.nextRaw)).toEqual([7, 1, 2, 3, 4, 5, 6]);
      expect(plan).toMatchObject({ prevTaskId: null, nextTaskId: 1 });
    });

    it("drops a task to the bottom after the last plain task", () => {
      const plan = planSingleMove(rawItems, groupedItems, 1, 7);

      expect(plan).toMatchObject({ prevTaskId: 7, nextTaskId: null });
    });

    /* Pins current behaviour, not a decided rule: a stale wrap anchor (e.g. list
       refetched mid-drag) silently moves the task to the top. */
    it("falls back to the top when the previous wrap is not in the grouped list", () => {
      const plan = planSingleMove(rawItems, groupedItems, 7, "wrap:999");

      expect(ids(plan!.nextRaw)).toEqual([7, 1, 2, 3, 4, 5, 6]);
    });

    it("returns null when the task is dropped where it already is", () => {
      expect(planSingleMove(rawItems, groupedItems, 1, null)).toBeNull();
      expect(planSingleMove(rawItems, groupedItems, 7, wrapB)).toBeNull();
    });
  });

  describe("planSpanMove", () => {
    it("drops a wrap after another wrap, anchoring on that wrap's last member", () => {
      const plan = planSpanMove(rawItems, groupedItems, wrapA, wrapB);

      expect(plan).not.toBeNull();
      expect(ids(plan!.nextRaw)).toEqual([1, 2, 5, 6, 3, 4, 7]);
      expect(plan).toMatchObject({
        taskIds: [3, 4],
        previousTaskId: 6,
        nextTaskId: 7,
      });
    });

    it("drops a wrap to the top when there is no previous item", () => {
      const plan = planSpanMove(rawItems, groupedItems, wrapB, null);

      expect(ids(plan!.nextRaw)).toEqual([5, 6, 1, 2, 3, 4, 7]);
      expect(plan).toMatchObject({
        taskIds: [5, 6],
        previousTaskId: null,
        nextTaskId: 1,
      });
    });

    it("drops a wrap after a plain task", () => {
      const plan = planSpanMove(rawItems, groupedItems, wrapA, 7);

      expect(ids(plan!.nextRaw)).toEqual([1, 2, 5, 6, 7, 3, 4]);
      expect(plan).toMatchObject({ previousTaskId: 7, nextTaskId: null });
    });

    it("returns null when the wrap is dropped where it already is", () => {
      expect(planSpanMove(rawItems, groupedItems, wrapA, 2)).toBeNull();
      expect(planSpanMove(rawItems, groupedItems, wrapB, wrapA)).toBeNull();
    });

    it("returns null when the wrap is not in the grouped list", () => {
      expect(planSpanMove(rawItems, groupedItems, "wrap:999", null)).toBeNull();
    });
  });
});
