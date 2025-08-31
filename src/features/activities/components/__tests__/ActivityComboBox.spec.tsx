import { render, screen } from "@/test/test-utils";
import { activities } from "@/test/store/activities";
import userEvent from "@testing-library/user-event";

import { ActivityComboBox } from "../ActivityComboBox";
import { useForm } from "react-hook-form";

describe("ActivityComboBox", () => {
  it("renders the component", () => {
    const Wrapper = () => {
      const { control } = useForm();
      return <ActivityComboBox name="activity" control={control} />;
    };
    render(<Wrapper />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});

it("displays the options when clicked", async () => {
  const user = userEvent.setup();

  const Wrapper = () => {
    const { control } = useForm();
    return <ActivityComboBox name="activity" control={control} />;
  };
  render(<Wrapper />);

  await user.click(screen.getByRole("button", { name: /combobox button/i }));

  expect(
    screen.getByRole("option", { name: activities[0].display_name }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("option", { name: activities[8].display_name }),
  ).toBeInTheDocument();
});
