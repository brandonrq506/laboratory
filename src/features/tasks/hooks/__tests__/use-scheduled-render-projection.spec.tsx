import { act, renderHook } from "@testing-library/react";

import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { projectScheduledItems } from "@/features/tasks/utils/project-scheduled-items";
import { scheduledTasks } from "@/test/store/tasks";
import { useExpansionMap } from "../use-expansion-map";
import { useScheduledDragHandlers } from "../use-scheduled-drag-handlers";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const APPLICATION_ID = 42;
const ROUTINE_NAME = "Workout";

const withApplication = (task: ScheduledTaskAPI): ScheduledTaskAPI => ({
  ...task,
  routine_application: {
    id: APPLICATION_ID,
    routine_id: APPLICATION_ID,
    routine_name: ROUTINE_NAME,
  },
});

/**
 * Composes the same primitives the page composes — expansion + drag — and
 * exposes the projected render items so we can assert how grouping, expansion,
 * and drag combine without mounting the page.
 */
const useProjection = (rawItems: ScheduledTaskAPI[]) => {
  const [expansion, toggleExpanded] = useExpansionMap();
  const performMove = () => Promise.resolve();
  const drag = useScheduledDragHandlers({ performMove });
  const groupedItems = groupRoutineTasks(
    rawItems.map((t) => ({ ...t, expected_start_time: new Date() })),
  );
  const projectedItems = projectScheduledItems(
    groupedItems,
    expansion,
    drag.draggingId,
  );
  return { expansion, toggleExpanded, projectedItems, ...drag };
};

describe("scheduled tasks render projection (expansion + drag)", () => {
  const wrappable: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
    withApplication(scheduledTasks[3]),
    withApplication(scheduledTasks[4]),
  ];

  it("toggleExpanded adds when absent and removes when present; drag handlers do not write expansion", () => {
    const { result } = renderHook(() => useProjection(wrappable));

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });
    expect(result.current.expansion.has(APPLICATION_ID)).toBe(true);

    act(() => {
      result.current.handleDragStart(scheduledTasks[0].id);
      result.current.handleDragCancel();
    });
    expect(result.current.expansion.has(APPLICATION_ID)).toBe(true);

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });
    expect(result.current.expansion.has(APPLICATION_ID)).toBe(false);
  });

  it("drops expanded-child rows of the dragging wrap and restores them on cancel", () => {
    const { result } = renderHook(() => useProjection(wrappable));

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });

    const expandedChildCountBefore = result.current.projectedItems.filter(
      (i) => i.kind === "expanded-child",
    ).length;
    expect(expandedChildCountBefore).toBeGreaterThan(0);
    const idsBefore = result.current.projectedItems.map((i) => i.id);

    act(() => {
      result.current.handleDragStart(wrapSortableId(APPLICATION_ID));
    });

    expect(
      result.current.projectedItems.filter(
        (i) =>
          i.kind === "expanded-child" &&
          i.parent_routine_application_id === APPLICATION_ID,
      ).length,
    ).toBe(0);
    expect(
      result.current.projectedItems.some(
        (i) => i.id === wrapSortableId(APPLICATION_ID),
      ),
    ).toBe(true);

    act(() => {
      result.current.handleDragCancel();
    });

    expect(
      result.current.projectedItems.filter((i) => i.kind === "expanded-child")
        .length,
    ).toBe(expandedChildCountBefore);
    expect(result.current.projectedItems.map((i) => i.id)).toEqual(idsBefore);
  });
});
