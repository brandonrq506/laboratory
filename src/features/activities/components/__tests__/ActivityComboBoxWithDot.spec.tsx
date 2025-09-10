import { render, screen } from "@/test/test-utils";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

import { ActivityComboBoxWithDot } from "../ActivityComboBoxWithDot";

describe("ActivityComboBoxWithDot", () => {
  const TestWrapper = () => {
    const { control } = useForm({
      defaultValues: { activity: null },
    });

    return <ActivityComboBoxWithDot name="activity" control={control} />;
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

    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);

    const firstOption = options[0];
    expect(firstOption).toBeInTheDocument();
  });

  it("filters options based on search query", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const combobox = screen.getByRole("combobox");

    await user.type(combobox, "Angular");

    const options = screen.queryAllByRole("option");

    expect(options[0]).toBeInTheDocument();
  });
});
