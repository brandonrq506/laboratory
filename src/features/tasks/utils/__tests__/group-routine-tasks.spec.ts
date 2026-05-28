/* eslint-disable max-lines */
import type {
  ScheduledGroupedItem,
  WrappedRoutineCard,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";

import { groupRoutineTasks } from "../group-routine-tasks";

type MakeArgs = {
  id: number;
  applicationId?: number | null;
  routineName?: string;
  expSeconds?: number;
};

const SENTINEL_DATE = new Date(0);

const makeTask = ({
  id,
  applicationId = null,
  routineName = "Routine",
  expSeconds = 60,
}: MakeArgs): ScheduledTaskWithEST => ({
  id,
  activity: {
    id,
    exp_seconds: expSeconds,
    category: {
      id: 1,
      name: "Productive",
      color: "blue",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
      user_id: 1,
    },
    created_at: "2025-01-01T00:00:00Z",
    max_seconds: expSeconds,
    name: `Activity ${id}`,
    display_name: `Activity ${id}`,
    updated_at: "2025-01-01T00:00:00Z",
    user_id: 1,
  },
  created_at: "2025-01-01T00:00:00Z",
  end_time: null,
  optional_name: null,
  position: String(id),
  scheduled_at: "2025-01-01T00:00:00Z",
  start_time: null,
  status: "scheduled",
  updated_at: "2025-01-01T00:00:00Z",
  note: "",
  expected_start_time: SENTINEL_DATE,
  routine_application:
    applicationId === null
      ? null
      : {
          id: applicationId,
          routine_id: applicationId,
          routine_name: routineName,
        },
});

const kinds = (items: ScheduledGroupedItem[]) => items.map((i) => i.kind);

const wrappedAt = (
  items: ScheduledGroupedItem[],
  index: number,
): WrappedRoutineCard => {
  const item = items[index];
  if (item.kind !== "wrap") {
    throw new Error(`Expected wrap at index ${index}, got ${item.kind}`);
  }
  return item;
};

describe("groupRoutineTasks — A. Basic wrap eligibility", () => {
  it("A1: group of 2 at exactly WRAP_POINT wraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "Workout" }),
      makeTask({ id: 5, applicationId: 1, routineName: "Workout" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    const wrap = wrappedAt(result, 3);
    expect(wrap.routine_application_id).toBe(1);
    expect(wrap.routine_name).toBe("Workout");
    expect(wrap.absorbed_count).toBe(2);
    expect(wrap.member_ids).toEqual([4, 5]);
    expect(wrap.absorbed_task_ids).toEqual([4, 5]);
  });

  it("A2: group of 1 never wraps (size fails MIN)", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4 }),
      makeTask({ id: 5, applicationId: 1, routineName: "Workout" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "task", "task"]);
  });

  it("A3: group below WRAP_POINT renders flat", () => {
    const tasks = [
      makeTask({ id: 1, applicationId: 1 }),
      makeTask({ id: 2, applicationId: 1 }),
      makeTask({ id: 3, applicationId: 1 }),
      makeTask({ id: 4 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "task"]);
  });

  it("A4: group of 5 contiguous past WRAP_POINT wraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "Morning" }),
      makeTask({ id: 5, applicationId: 1, routineName: "Morning" }),
      makeTask({ id: 6, applicationId: 1, routineName: "Morning" }),
      makeTask({ id: 7, applicationId: 1, routineName: "Morning" }),
      makeTask({ id: 8, applicationId: 1, routineName: "Morning" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    const wrap = wrappedAt(result, 3);
    expect(wrap.absorbed_count).toBe(5);
    expect(wrap.member_ids).toEqual([4, 5, 6, 7, 8]);
  });
});

describe("groupRoutineTasks — B. Tolerance", () => {
  it("B1: one foreigner in a single gap at TOL=1 wraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6 }),
      makeTask({ id: 7, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    const wrap = wrappedAt(result, 3);
    expect(wrap.absorbed_count).toBe(4);
    expect(wrap.absorbed_task_ids).toEqual([4, 5, 6, 7]);
    expect(wrap.member_ids).toEqual([4, 5, 7]);
  });

  it("B2: two foreigners in a single gap at TOL=1 unwraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(8).fill("task"));
  });

  it("B3: foreigners outside span are ignored", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8 }),
      makeTask({ id: 9 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual([
      "task",
      "task",
      "task",
      "wrap",
      "task",
      "task",
      "task",
    ]);
    expect(wrappedAt(result, 3).absorbed_count).toBe(3);
  });
});

describe("groupRoutineTasks — C. Absorption cap", () => {
  it("C1: TOL passing but absorbed > CAP unwraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8, applicationId: 1 }),
      makeTask({ id: 9 }),
      makeTask({ id: 10, applicationId: 1 }),
      makeTask({ id: 11 }),
      makeTask({ id: 12, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(12).fill("task"));
  });

  it("C2: exactly CAP foreigners wraps (boundary)", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8, applicationId: 1 }),
      makeTask({ id: 9 }),
      makeTask({ id: 10, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    expect(wrappedAt(result, 3).absorbed_count).toBe(7);
  });
});

describe("groupRoutineTasks — multi-application & name reuse", () => {
  it("two non-overlapping applications produce two cards", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 5, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 6, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 7, applicationId: 2, routineName: "R2" }),
      makeTask({ id: 8, applicationId: 2, routineName: "R2" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap", "wrap"]);
    expect(wrappedAt(result, 3).routine_application_id).toBe(1);
    expect(wrappedAt(result, 4).routine_application_id).toBe(2);
  });

  it("identical names on distinct applications produce two cards", () => {
    const tasks = [
      makeTask({ id: 1, applicationId: 100, routineName: "Morning" }),
      makeTask({ id: 2, applicationId: 100, routineName: "Morning" }),
      makeTask({ id: 3, applicationId: 100, routineName: "Morning" }),
      makeTask({ id: 4, applicationId: 101, routineName: "Morning" }),
      makeTask({ id: 5, applicationId: 101, routineName: "Morning" }),
      makeTask({ id: 6, applicationId: 101, routineName: "Morning" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    expect(wrappedAt(result, 3).routine_application_id).toBe(101);
  });
});

describe("groupRoutineTasks — E. Reactive re-evaluation (post-mutation arrays)", () => {
  it("E1: removing a leading manual drops group below WRAP_POINT — auto-unwrap", () => {
    const tasks = [
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(5).fill("task"));
  });

  it("E2: dropping a foreigner past CAP — auto-unwrap", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8, applicationId: 1 }),
      makeTask({ id: 9 }),
      makeTask({ id: 99 }),
      makeTask({ id: 10, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(11).fill("task"));
  });

  it("E3: deleting a foreigner returns span to ≤ CAP — auto-rewrap", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7 }),
      makeTask({ id: 8, applicationId: 1 }),
      makeTask({ id: 9 }),
      makeTask({ id: 10, applicationId: 1 }),
      makeTask({ id: 12, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    expect(wrappedAt(result, 3).absorbed_count).toBe(8);
  });

  it("E4: post-move with wrapped-card-as-unit at top — auto-unwrap", () => {
    const tasks = [
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(6).fill("task"));
  });
});

describe("groupRoutineTasks — G. Extraction effects", () => {
  it("G3: dragging a member out of expansion breaks tolerance — unwraps", () => {
    const tasks = [
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(6).fill("task"));
  });

  it("G4: extracting a member drops group below MIN — no card", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "task"]);
  });
});

describe("groupRoutineTasks — H. Overlap (outer-wins)", () => {
  it("H1: outer encountered first absorbs inner's members", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "Routine 1" }),
      makeTask({ id: 5, applicationId: 2, routineName: "Routine 2" }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7, applicationId: 2 }),
      makeTask({ id: 8, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap"]);
    const wrap = wrappedAt(result, 3);
    expect(wrap.routine_application_id).toBe(1);
    expect(wrap.routine_name).toBe("Routine 1");
    expect(wrap.absorbed_count).toBe(5);
    expect(wrap.absorbed_task_ids).toEqual([4, 5, 6, 7, 8]);
    expect(wrap.member_ids).toEqual([4, 6, 8]);
  });

  it("H2: inner has residual outside the outer's span — residual renders plain", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 2, routineName: "Routine 2" }),
      makeTask({ id: 5, applicationId: 1, routineName: "Routine 1" }),
      makeTask({ id: 6, applicationId: 2 }),
      makeTask({ id: 7, applicationId: 1 }),
      makeTask({ id: 8, applicationId: 2 }),
      makeTask({ id: 9, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap", "task"]);
    const wrap = wrappedAt(result, 3);
    expect(wrap.routine_application_id).toBe(2);
    expect(wrap.absorbed_count).toBe(5);
    expect(wrap.absorbed_task_ids).toEqual([4, 5, 6, 7, 8]);
    const residual = result[4];
    expect(residual.kind).toBe("task");
    if (residual.kind === "task") expect(residual.id).toBe(9);
  });

  it("H3: two adjacent non-overlapping routines wrap independently", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 5, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 6, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 7, applicationId: 2, routineName: "R2" }),
      makeTask({ id: 8, applicationId: 2, routineName: "R2" }),
      makeTask({ id: 9, applicationId: 2, routineName: "R2" }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(["task", "task", "task", "wrap", "wrap"]);
    expect(wrappedAt(result, 3).routine_application_id).toBe(1);
    expect(wrappedAt(result, 4).routine_application_id).toBe(2);
  });

  it("H4: outer fails CAP, inner gets a chance and wraps", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1, routineName: "R1" }),
      makeTask({ id: 5, applicationId: 2, routineName: "R2" }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7, applicationId: 2 }),
      makeTask({ id: 8, applicationId: 1 }),
      makeTask({ id: 9, applicationId: 2 }),
      makeTask({ id: 10, applicationId: 1 }),
      makeTask({ id: 11, applicationId: 2 }),
      makeTask({ id: 12, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual([
      "task",
      "task",
      "task",
      "task",
      "wrap",
      "task",
    ]);
    const wrap = wrappedAt(result, 4);
    expect(wrap.routine_application_id).toBe(2);
    expect(wrap.absorbed_count).toBe(7);
    const residual = result[5];
    expect(residual.kind).toBe("task");
    if (residual.kind === "task") expect(residual.id).toBe(12);
  });
});

describe("groupRoutineTasks — J. Edge cases & invariants", () => {
  it("J5: ≤1-card invariant — sprawled routine unwraps entirely (no fragmentation)", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7, applicationId: 1 }),
      makeTask({ id: 8 }),
      makeTask({ id: 9 }),
      makeTask({ id: 10, applicationId: 1 }),
      makeTask({ id: 11, applicationId: 1 }),
      makeTask({ id: 12, applicationId: 1 }),
      makeTask({ id: 13 }),
      makeTask({ id: 14 }),
      makeTask({ id: 15, applicationId: 1 }),
      makeTask({ id: 16, applicationId: 1 }),
      makeTask({ id: 17, applicationId: 1 }),
      makeTask({ id: 18 }),
      makeTask({ id: 19 }),
      makeTask({ id: 20, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    expect(kinds(result)).toEqual(Array(20).fill("task"));
    const wrapItems = result.filter((i) => i.kind === "wrap");
    expect(wrapItems).toHaveLength(0);
  });

  it("J5 variant: never produces two cards for the same routine_application_id", () => {
    const tasks = [
      makeTask({ id: 1 }),
      makeTask({ id: 2 }),
      makeTask({ id: 3 }),
      makeTask({ id: 4, applicationId: 1 }),
      makeTask({ id: 5, applicationId: 1 }),
      makeTask({ id: 6, applicationId: 1 }),
      makeTask({ id: 7, applicationId: 1 }),
    ];
    const result = groupRoutineTasks(tasks);
    const ids = result
      .filter((i): i is WrappedRoutineCard => i.kind === "wrap")
      .map((i) => i.routine_application_id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
