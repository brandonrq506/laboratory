import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { SortableItemCard } from "@/components/core";
import { SortableTaskList } from "../SortableTaskList";

type NumericItem = { id: number; label: string };
type StringItem = { id: string; label: string };

const numericItems: NumericItem[] = [
  { id: 1, label: "Alpha" },
  { id: 2, label: "Beta" },
  { id: 3, label: "Gamma" },
];

const renderItem = <T extends { id: string | number; label: string }>(
  item: T,
) => (
  <SortableItemCard itemId={item.id}>
    <span>{item.label}</span>
  </SortableItemCard>
);

describe("SortableTaskList", () => {
  it("renders one row per item via renderItem", () => {
    render(
      <SortableTaskList
        items={numericItems}
        onDragEnd={vi.fn()}
        renderItem={renderItem}
      />,
    );

    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("renders the empty state when items is empty", () => {
    render(
      <SortableTaskList
        items={[]}
        onDragEnd={vi.fn()}
        renderItem={renderItem}
      />,
    );

    expect(screen.getByText("No Tasks")).toBeInTheDocument();
  });

  it("accepts items whose id is a string sentinel without runtime error", () => {
    const stringItems: StringItem[] = [
      { id: "wrap:7", label: "Wrapped" },
      { id: "wrap:8", label: "Another" },
    ];

    expect(() =>
      render(
        <SortableTaskList
          items={stringItems}
          onDragEnd={vi.fn()}
          renderItem={renderItem}
        />,
      ),
    ).not.toThrow();

    expect(screen.getByText("Wrapped")).toBeInTheDocument();
    expect(screen.getByText("Another")).toBeInTheDocument();
  });

  it("fires onDragStart with the active id when keyboard drag is initiated", async () => {
    const user = userEvent.setup();
    const onDragStart = vi.fn();

    render(
      <SortableTaskList
        items={numericItems}
        onDragStart={onDragStart}
        onDragEnd={vi.fn()}
        renderItem={renderItem}
      />,
    );

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");

    expect(onDragStart).toHaveBeenCalledWith(1);
  });

  it("fires onDragCancel with the active id when keyboard drag is cancelled with Escape", async () => {
    const user = userEvent.setup();
    const onDragCancel = vi.fn();

    render(
      <SortableTaskList
        items={numericItems}
        onDragCancel={onDragCancel}
        onDragEnd={vi.fn()}
        renderItem={renderItem}
      />,
    );

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");
    await user.keyboard("[Escape]");

    expect(onDragCancel).toHaveBeenCalledWith(1);
  });

  it("calls onDragCancel (not onDragEnd) when the drop lands on the same item (no-op)", async () => {
    const user = userEvent.setup();
    const onDragEnd = vi.fn();
    const onDragCancel = vi.fn();

    render(
      <SortableTaskList
        items={numericItems}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        renderItem={renderItem}
      />,
    );

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");
    await user.keyboard("[Space]");

    expect(onDragEnd).not.toHaveBeenCalled();
    expect(onDragCancel).toHaveBeenCalledWith(1);
  });
});
