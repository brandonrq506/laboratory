import { render, screen } from "@testing-library/react";
import { DateFilter } from "./DateFilter";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

describe("DateFilter", () => {
  it("renders the label and input correctly", () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" /> },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  });

  it("displays the asterisk if showAsterisk is true", () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" showAsterisk /> },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not display the asterisk if showAsterisk is false", () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" /> },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders a description if provided", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <DateFilter label="Date" description="Select a date" />
        ),
      },
    ]);
    render(<Stub initialEntries={["/"]} />);
    expect(screen.getByText(/Select a date/i)).toBeInTheDocument();
  });

  it("hides the label if hideLabel is true", () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" hideLabel /> },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(screen.getByText(/Date/i)).toHaveClass("sr-only");
  });

  it("renders the input with the correct value", () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" /> },
    ]);
    render(<Stub initialEntries={["/"]} />);

    const input = screen.getByLabelText(/Date/i) as HTMLInputElement;
    expect(input.value).toBe(new Date().toISOString().split("T")[0]);
  });

  it("updates search params when input value changes", async () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <DateFilter label="Date" /> },
    ]);
    render(<Stub initialEntries={["/"]} />);
    const input = screen.getByLabelText(/Date/i) as HTMLInputElement;

    const newDate = "2025-01-01";
    await userEvent.clear(input);
    await userEvent.type(input, newDate);

    expect(input.value).toBe(newDate);
  });
});
