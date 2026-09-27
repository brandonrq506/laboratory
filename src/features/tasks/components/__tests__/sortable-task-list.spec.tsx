import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { SortableItemCard } from "@/components/core";
import { SortableTaskList } from "../SortableTaskList";

type LabeledItem = { id: string | number; label: string };
type NumericItem = { id: number; label: string };
type StringItem = { id: string; label: string };

const numericItems: NumericItem[] = [
  { id: 1, label: "Alpha" },
  { id: 2, label: "Beta" },
  { id: 3, label: "Gamma" },
];

const renderItem = <T extends LabeledItem>(item: T) => (
  <SortableItemCard itemId={item.id}>
    <span>{item.label}</span>
  </SortableItemCard>
);

const renderOverlay = <T extends LabeledItem>(item: T) => (
  <span>{`${item.label} overlay`}</span>
);

const listProps = <T extends LabeledItem>(items: T[]) => ({
  items,
  renderItem,
  renderOverlay,
  onDragStart: vi.fn(),
  onDragEnd: vi.fn(),
  onDragCancel: vi.fn(),
});

describe("SortableTaskList", () => {
  it("renders one row per item via renderItem", () => {
    render(<SortableTaskList {...listProps(numericItems)} />);

    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("renders the empty state when items is empty", () => {
    render(<SortableTaskList {...listProps<NumericItem>([])} />);

    expect(screen.getByText("No Tasks")).toBeInTheDocument();
  });

  it("accepts items whose id is a string sentinel without runtime error", () => {
    const stringItems: StringItem[] = [
      { id: "wrap:7", label: "Wrapped" },
      { id: "wrap:8", label: "Another" },
    ];

    expect(() =>
      render(<SortableTaskList {...listProps(stringItems)} />),
    ).not.toThrow();

    expect(screen.getByText("Wrapped")).toBeInTheDocument();
    expect(screen.getByText("Another")).toBeInTheDocument();
  });

  it("fires onDragStart with the active id when keyboard drag is initiated", async () => {
    const user = userEvent.setup();
    const props = listProps(numericItems);

    render(<SortableTaskList {...props} />);

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");

    expect(props.onDragStart).toHaveBeenCalledWith(1);
  });

  it("fires onDragCancel with the active id when keyboard drag is cancelled with Escape", async () => {
    const user = userEvent.setup();
    const props = listProps(numericItems);

    render(<SortableTaskList {...props} />);

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");
    await user.keyboard("[Escape]");

    expect(props.onDragCancel).toHaveBeenCalledWith(1);
  });

  it("calls onDragCancel (not onDragEnd) when the drop lands on the same item (no-op)", async () => {
    const user = userEvent.setup();
    const props = listProps(numericItems);

    render(<SortableTaskList {...props} />);

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");
    await user.keyboard("[Space]");

    expect(props.onDragEnd).not.toHaveBeenCalled();
    expect(props.onDragCancel).toHaveBeenCalledWith(1);
  });

  it("renders the active item through renderOverlay only while dragging", async () => {
    const user = userEvent.setup();

    render(<SortableTaskList {...listProps(numericItems)} />);

    expect(screen.queryByText("Alpha overlay")).not.toBeInTheDocument();

    const handles = screen.getAllByRole("button", { name: /drag handle/i });
    handles[0].focus();
    await user.keyboard("[Space]");

    expect(screen.getByText("Alpha overlay")).toBeInTheDocument();
    expect(screen.queryByText("Beta overlay")).not.toBeInTheDocument();
  });
});
