import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DurationInput } from "./DurationInput";

describe("DurationInput", () => {
  it("is accessible even if label is hidden", () => {
    render(
      <DurationInput
        label="Invisible"
        minutesregistration={{}}
        hoursregistration={{}}
        hideLabel
      />,
    );

    expect(screen.getAllByLabelText(/invisible/i)[0]).toBeInTheDocument();
  });

  it("displays the asterisk if showAsterisk is true", () => {
    render(
      <DurationInput
        label="Duration"
        showAsterisk
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not display the asterisk if showAsterisk is false", () => {
    render(
      <DurationInput
        label="Duration"
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders a description if provided", () => {
    render(
      <DurationInput
        label="Duration"
        description="Enter the duration"
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    expect(screen.getByText(/Enter the duration/i)).toBeInTheDocument();
  });

  it("renders an error message if error prop is provided", () => {
    render(
      <DurationInput
        label="Duration"
        error="Invalid duration"
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    expect(screen.getByText(/Invalid duration/i)).toBeInTheDocument();
  });

  it("renders error instead of description if both are provided", () => {
    const description = "Enter the duration";
    const error = "Invalid duration";

    render(
      <DurationInput
        label="Duration"
        description={description}
        error={error}
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    expect(screen.queryByText(description)).not.toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("adds aria-invalid and invalid styles when error prop is present", () => {
    render(
      <DurationInput
        label="Duration"
        error="Invalid duration"
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    const inputElement = screen.getAllByLabelText(/Duration/i);
    expect(inputElement[0]).toHaveAttribute("aria-invalid");
    expect(inputElement[1]).toHaveAttribute("aria-invalid");
  });

  it("does not apply error styles if no error is present", () => {
    render(
      <DurationInput
        label="Duration"
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    const inputElement = screen.getAllByLabelText(/Duration/i);
    expect(inputElement[0]).not.toHaveAttribute("aria-invalid");
    expect(inputElement[1]).not.toHaveAttribute("aria-invalid");
  });

  it("focuses on the first input when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DurationInput
        label="Duration"
        hoursProps={{ placeholder: "Hours" }}
        minutesProps={{ placeholder: "Minutes" }}
        minutesregistration={{}}
        hoursregistration={{}}
      />,
    );

    const label = screen.getByText("Duration");

    const minutesInput = screen.getByPlaceholderText("Minutes");
    const hoursInput = screen.getByPlaceholderText("Hours");

    await user.click(label);

    expect(hoursInput).toHaveFocus();
    expect(minutesInput).not.toHaveFocus();
  });
});
