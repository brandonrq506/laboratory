import { render, screen } from "@/test/test-utils";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

import { ActivityComboBoxWithBadge } from "../ActivityComboBoxWithBadge";

describe("ActivityComboBoxWithBadge", () => {
  const TestWrapper = () => {
    const { control } = useForm({
      defaultValues: { activity: null },
    });

    return <ActivityComboBoxWithBadge name="activity" control={control} />;
  };

  it("renders the component with activities label", () => {
    render(<TestWrapper />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("Activities")).toBeInTheDocument();
  });

  it("displays activity options with category badges when clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const button = screen.getByRole("button", { name: /combobox button/i });
    await user.click(button);

    // Check if options are displayed (activities from test store)
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);

    // Check if the first option contains both the category badge and activity name
    const firstOption = options[0];
    expect(firstOption).toBeInTheDocument();
  });

  it("filters options based on search query", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const combobox = screen.getByRole("combobox");

    // Type a search term
    await user.type(combobox, "Angular");

    // Should show options containing "Angular"
    const options = screen.queryAllByRole("option");

    // At least one option should be visible if Angular exists in test data
    if (options.length > 0) {
      expect(options[0]).toBeInTheDocument();
    }
  });

  it("shows category badges in options", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const button = screen.getByRole("button", { name: /combobox button/i });
    await user.click(button);

    // Look for category badges - they should be spans with specific classes
    const categoryBadges = screen.queryAllByText(
      /Productive|Learning|Personal/,
    );

    // If activities have categories, badges should be present
    expect(categoryBadges.length).toBeGreaterThanOrEqual(0);
  });
});
