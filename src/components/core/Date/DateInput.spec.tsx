import { render, screen } from "@testing-library/react";
import { DateInput } from "./DateInput";

describe("DateInput", () => {
  it("renders the label and input correctly", () => {
    render(<DateInput label="Date" />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  });

  it("displays the asterisk if showAsterisk is true", () => {
    render(<DateInput label="Date" showAsterisk />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not display the asterisk if showAsterisk is false", () => {
    render(<DateInput label="Date" />);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders a description if provided", () => {
    render(<DateInput label="Date" description="Select a date" />);

    expect(screen.getByText(/Select a date/i)).toBeInTheDocument();
  });

  it("hides the label if hideLabel is true", () => {
    render(<DateInput label="Date" hideLabel />);

    expect(screen.getByText(/Date/i)).toHaveClass("sr-only");
  });

  it("renders the input with the correct value", () => {
    const value = "2021-01-01";
    render(<DateInput label="Date" value={value} onChange={() => {}} />);

    const input = screen.getByLabelText(/Date/i) as HTMLInputElement;

    expect(input.value).toBe(value);
  });
});
