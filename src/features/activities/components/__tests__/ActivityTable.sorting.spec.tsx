import { render, screen, within } from "@/test/test-utils";
import { ActivityTable } from "../ActivityTable";
import userEvent from "@testing-library/user-event";

const getColumnValues = (columnIndex: number) =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[columnIndex].textContent);

const loadTable = async () => {
  const user = userEvent.setup();
  render(<ActivityTable />);
  await screen.findByText("Brush Teeth");
  return user;
};

describe("ActivityTable sorting", () => {
  it("starts with display names ascending and toggles descending", async () => {
    const user = await loadTable();

    expect(getColumnValues(0)).toEqual([
      "Angular",
      "Bathroom",
      "Breakfast",
      "Brush Teeth",
      "Chess",
      "Cooking",
      "Dinner",
      "Procrastinate",
      "Sleep",
    ]);

    await user.click(screen.getByText("Display Name"));

    expect(getColumnValues(0)).toEqual([
      "Sleep",
      "Procrastinate",
      "Dinner",
      "Cooking",
      "Chess",
      "Brush Teeth",
      "Breakfast",
      "Bathroom",
      "Angular",
    ]);
  });

  it("sorts categories ascending and descending", async () => {
    const user = await loadTable();

    await user.click(screen.getByText("Category"));

    expect(getColumnValues(3)).toEqual([
      "Necessary",
      "Necessary",
      "Procrastination",
      "Procrastination",
      "Productive",
      "Productive",
      "Wellness",
      "Wellness",
      "Wellness",
    ]);

    await user.click(screen.getByText("Category"));

    expect(getColumnValues(3)).toEqual([
      "Wellness",
      "Wellness",
      "Wellness",
      "Productive",
      "Productive",
      "Procrastination",
      "Procrastination",
      "Necessary",
      "Necessary",
    ]);
  });

  it("sorts formatted durations by their values", async () => {
    const user = await loadTable();

    await user.click(screen.getByText("Exp. Duration"));

    expect(getColumnValues(0)).toEqual([
      "Bathroom",
      "Brush Teeth",
      "Procrastinate",
      "Breakfast",
      "Cooking",
      "Dinner",
      "Sleep",
      "Chess",
      "Angular",
    ]);
  });

  it("limits Shift multi-sort to three columns", async () => {
    const user = await loadTable();

    await user.keyboard("[ShiftLeft>]");
    await user.click(screen.getByText("Category"));
    await user.click(screen.getByText("Exp. Duration"));

    expect(getColumnValues(0)).toEqual([
      "Angular",
      "Bathroom",
      "Breakfast",
      "Brush Teeth",
      "Chess",
      "Cooking",
      "Dinner",
      "Procrastinate",
      "Sleep",
    ]);

    await user.click(screen.getByText("Max. Duration"));
    await user.keyboard("[/ShiftLeft]");

    expect(getColumnValues(0)).toEqual([
      "Bathroom",
      "Cooking",
      "Procrastinate",
      "Sleep",
      "Chess",
      "Angular",
      "Brush Teeth",
      "Breakfast",
      "Dinner",
    ]);
  });
});
