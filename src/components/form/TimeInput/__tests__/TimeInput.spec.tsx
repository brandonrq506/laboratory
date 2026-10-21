import { render, screen } from "@/test/test-utils";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

import { TimeInput } from "../TimeInput";
import type { TimeInputTransform } from "../types";
import { instantOnTransform } from "../utils/timeInputTransforms";

interface FormValues {
  start_time: string;
}

interface HarnessProps {
  defaultValue: string;
  transform: TimeInputTransform;
  onSubmit: (data: FormValues) => void;
}

const REQUIRED_MESSAGE = "Start time is required.";

const Harness = ({ defaultValue, transform, onSubmit }: HarnessProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { start_time: defaultValue },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TimeInput
        label="Start Time"
        name="start_time"
        control={control}
        transform={transform}
        rules={{ required: REQUIRED_MESSAGE }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("TimeInput", () => {
  const date = new Date(2026, 9, 19, 9, 0);
  const transform = instantOnTransform(date);

  it("shows the saved time in local HH:mm", () => {
    render(
      <Harness
        defaultValue={date.toISOString()}
        transform={transform}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/Start Time/)).toHaveValue("09:00");
  });

  it("submits the typed time on the given date", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Harness
        defaultValue={date.toISOString()}
        transform={transform}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByLabelText(/Start Time/);
    await user.clear(input);
    await user.type(input, "09:15");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { start_time: new Date(2026, 9, 19, 9, 15).toISOString() },
      expect.anything(),
    );
  });

  it("shows the required error when cleared instead of crashing", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Harness
        defaultValue={date.toISOString()}
        transform={transform}
        onSubmit={onSubmit}
      />,
    );

    await user.clear(screen.getByLabelText(/Start Time/));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText(REQUIRED_MESSAGE)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
