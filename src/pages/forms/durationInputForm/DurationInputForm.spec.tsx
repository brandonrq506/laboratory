import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DurationInputForm } from "./DurationInputForm";

describe("DurationInputForm", () => {
  it("shows default values", () => {
    render(<DurationInputForm />);

    expect(screen.getByPlaceholderText("01")).toHaveValue(2);
    expect(screen.getByPlaceholderText("30")).toHaveValue(30);
  });

  it("submits successfully with default values", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(
      screen.getByText("Form submitted successfully!"),
    ).toBeInTheDocument();
  });

  it("submits successfully with valid values", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const hoursInput = screen.getByPlaceholderText("01");
    const minutesInput = screen.getByPlaceholderText("30");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(hoursInput);
    await user.type(hoursInput, "5");

    await user.clear(minutesInput);
    await user.type(minutesInput, "45");

    await user.click(submitButton);

    expect(
      screen.getByText("Form submitted successfully!"),
    ).toBeInTheDocument();
  });

  it("shows error when hours is less than 0", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const hoursInput = screen.getByPlaceholderText("01");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(hoursInput);
    await user.type(hoursInput, "-1");

    await user.click(submitButton);

    expect(screen.getByText("Hours must be at least 0")).toBeInTheDocument();
    expect(hoursInput).toHaveFocus();
  });

  it("shows an error when try to submit with over 23 hours", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const hoursInput = screen.getByPlaceholderText("01");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(hoursInput);
    await user.type(hoursInput, "24");

    await user.click(submitButton);

    expect(screen.getByText("Hours must be less than 24")).toBeInTheDocument();
    expect(hoursInput).toHaveFocus();
  });

  it("shows error when minutes is less than 0", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const minutesInput = screen.getByPlaceholderText("30");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(minutesInput);
    await user.type(minutesInput, "-1");

    await user.click(submitButton);

    expect(screen.getByText("Minutes must be at least 0")).toBeInTheDocument();
    expect(minutesInput).toHaveFocus();
  });

  it("shows an error when try to submit with over 59 minutes", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const minutesInput = screen.getByPlaceholderText("30");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(minutesInput);
    await user.type(minutesInput, "60");

    await user.click(submitButton);

    expect(
      screen.getByText("Minutes must be less than 60"),
    ).toBeInTheDocument();
    expect(minutesInput).toHaveFocus();
  });

  it("shows an error when try to submit with 0 minutes and 0 hours", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const hoursInput = screen.getByPlaceholderText("01");
    const minutesInput = screen.getByPlaceholderText("30");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(hoursInput);
    await user.type(hoursInput, "0");

    await user.clear(minutesInput);
    await user.type(minutesInput, "0");

    await user.click(submitButton);

    expect(
      screen.getByText("Duration must be at least 1 minute"),
    ).toBeInTheDocument();
    expect(minutesInput).toHaveFocus();
  });

  it("it clears 0 hours and 0 minutes error even when the hour input is updated", async () => {
    const user = userEvent.setup();
    render(<DurationInputForm />);

    const hoursInput = screen.getByPlaceholderText("01");
    const minutesInput = screen.getByPlaceholderText("30");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(hoursInput);
    await user.type(hoursInput, "0");

    await user.clear(minutesInput);
    await user.type(minutesInput, "0");

    await user.click(submitButton);

    expect(
      screen.getByText("Duration must be at least 1 minute"),
    ).toBeInTheDocument();
    expect(minutesInput).toHaveFocus();

    await user.clear(hoursInput);
    await user.type(hoursInput, "1");

    expect(
      screen.queryByText("Duration must be at least 1 minute"),
    ).not.toBeInTheDocument();

    await user.click(submitButton);

    expect(
      screen.getByText("Form submitted successfully!"),
    ).toBeInTheDocument();
  });
});
