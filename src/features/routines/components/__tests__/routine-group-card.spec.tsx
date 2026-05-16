import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RoutineGroupCard } from "../routine-group-card";

import type { ScheduledTaskWithExpectedStartTime } from "@/features/tasks/types/scheduledTaskWithExpectedStartTime";
import type { WrappedRoutineItem } from "@/features/tasks/types/scheduled-visible-item";

const APPLICATION_ID = 42;
const ROUTINE_NAME = "Workout";

const buildAbsorbedTask = (
  id: number,
  exp_seconds: number,
): ScheduledTaskWithExpectedStartTime => ({
  id,
  activity: {
    id,
    exp_seconds,
    max_seconds: exp_seconds + 60,
    name: `Activity ${id}`,
    display_name: `Activity ${id}`,
    user_id: 1,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
    category: {
      id: 1,
      name: "Wellness",
      color: "blue",
      user_id: 1,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-01T00:00:00.000Z",
    },
  },
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
  end_time: null,
  optional_name: null,
  position: `${id}.0`,
  scheduled_at: "2025-05-08T09:00:00.000Z",
  start_time: null,
  status: "scheduled",
  note: "",
  routine_application: {
    id: APPLICATION_ID,
    routine_id: 7,
    routine_name: ROUTINE_NAME,
  },
  expected_start_time: new Date("2025-05-08T09:00:00.000Z"),
});

const buildItem = (): WrappedRoutineItem => {
  const tasks = [
    buildAbsorbedTask(101, 600),
    buildAbsorbedTask(102, 1200),
    buildAbsorbedTask(103, 900),
  ];
  return {
    kind: "wrap",
    id: `wrap:${APPLICATION_ID}`,
    routine_application_id: APPLICATION_ID,
    routine_name: ROUTINE_NAME,
    member_ids: [101, 102, 103],
    absorbed_task_ids: [101, 102, 103],
    absorbed_tasks: tasks,
    total_seconds: 2700,
    expected_start_time: new Date("2025-05-08T09:00:00.000Z"),
    absorbed_count: 3,
  };
};

type RenderOpts = {
  expanded?: boolean;
  isDraggingThisCard?: boolean;
  onToggleExpanded?: (id: number) => void;
  onBulkDelete?: (ids: number[]) => void;
  parentClick?: (e: React.MouseEvent) => void;
  item?: WrappedRoutineItem;
};

const renderCard = ({
  expanded = false,
  isDraggingThisCard = false,
  onToggleExpanded = vi.fn(),
  onBulkDelete = vi.fn(),
  parentClick,
  item = buildItem(),
}: RenderOpts = {}) => {
  const utils = render(
    <div onClick={parentClick}>
      <DndContext>
        <SortableContext items={[item.id]}>
          <RoutineGroupCard
            item={item}
            expanded={expanded}
            isDraggingThisCard={isDraggingThisCard}
            onToggleExpanded={onToggleExpanded}
            onBulkDelete={onBulkDelete}
          />
        </SortableContext>
      </DndContext>
    </div>,
  );
  return { ...utils, item, onToggleExpanded, onBulkDelete };
};

describe("RoutineGroupCard", () => {
  it("renders routine name, task count, aggregated duration, and expected start time", () => {
    renderCard();

    expect(screen.getByText(ROUTINE_NAME)).toBeInTheDocument();
    expect(screen.getByText("3 tasks")).toBeInTheDocument();
    expect(screen.getByText("45m")).toBeInTheDocument();
    const startTime = new Date("2025-05-08T09:00:00.000Z").toLocaleTimeString(
      navigator.languages,
      {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      },
    );
    expect(screen.getByText(startTime)).toBeInTheDocument();
  });

  it("calls onToggleExpanded with routine_application_id when chevron is clicked", async () => {
    const user = userEvent.setup();
    const onToggleExpanded = vi.fn();
    renderCard({ onToggleExpanded });

    await user.click(screen.getByRole("button", { name: /expand workout/i }));

    expect(onToggleExpanded).toHaveBeenCalledTimes(1);
    expect(onToggleExpanded).toHaveBeenCalledWith(APPLICATION_ID);
  });

  it("reflects aria-expanded and aria-controls on the chevron", () => {
    const { rerender, item } = renderCard({ expanded: false });

    const collapsedChevron = screen.getByRole("button", {
      name: /expand workout/i,
    });
    expect(collapsedChevron).toHaveAttribute("aria-expanded", "false");
    expect(collapsedChevron).toHaveAttribute(
      "aria-controls",
      `wrap-${APPLICATION_ID}-children`,
    );

    rerender(
      <DndContext>
        <SortableContext items={[item.id]}>
          <RoutineGroupCard
            item={item}
            expanded={true}
            isDraggingThisCard={false}
            onToggleExpanded={vi.fn()}
            onBulkDelete={vi.fn()}
          />
        </SortableContext>
      </DndContext>,
    );

    const expandedChevron = screen.getByRole("button", {
      name: /collapse workout/i,
    });
    expect(expandedChevron).toHaveAttribute("aria-expanded", "true");
  });

  it("renders SR-only chevron label as 'Expand {name}' when collapsed", () => {
    renderCard({ expanded: false });
    expect(
      screen.getByRole("button", { name: "Expand Workout" }),
    ).toBeInTheDocument();
  });

  it("renders SR-only chevron label as 'Collapse {name}' when expanded", () => {
    renderCard({ expanded: true });
    expect(
      screen.getByRole("button", { name: "Collapse Workout" }),
    ).toBeInTheDocument();
  });

  it("calls onBulkDelete with absorbed_task_ids in order when trash is clicked", async () => {
    const user = userEvent.setup();
    const onBulkDelete = vi.fn();
    renderCard({ onBulkDelete });

    await user.click(
      screen.getByRole("button", { name: /delete workout routine/i }),
    );

    expect(onBulkDelete).toHaveBeenCalledTimes(1);
    expect(onBulkDelete).toHaveBeenCalledWith([101, 102, 103]);
  });

  it("renders the wrapped (collapsed) layout when isDraggingThisCard is true even if expanded is true", () => {
    renderCard({ expanded: true, isDraggingThisCard: true });

    expect(
      screen.getByRole("button", { name: "Expand Workout" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the expanded layout when expanded is true and not dragging", () => {
    renderCard({ expanded: true, isDraggingThisCard: false });

    expect(
      screen.getByRole("button", { name: "Collapse Workout" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("stops trash button click from propagating to ancestor handlers", async () => {
    const user = userEvent.setup();
    const parentClick = vi.fn();
    const onBulkDelete = vi.fn();
    renderCard({ onBulkDelete, parentClick });

    await user.click(
      screen.getByRole("button", { name: /delete workout routine/i }),
    );

    expect(onBulkDelete).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("stops chevron click from propagating to ancestor handlers", async () => {
    const user = userEvent.setup();
    const parentClick = vi.fn();
    const onToggleExpanded = vi.fn();
    renderCard({ onToggleExpanded, parentClick });

    await user.click(screen.getByRole("button", { name: /expand workout/i }));

    expect(onToggleExpanded).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("Tab order across the wrapped row is handle, trash, chevron", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.tab();
    expect(screen.getByRole("button", { name: /drag handle/i })).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: /delete workout routine/i }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: /expand workout/i }),
    ).toHaveFocus();
  });
});
