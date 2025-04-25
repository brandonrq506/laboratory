import { render, screen } from "@/test/test-utils";
import { ActivityForm } from "./ActivityForm";
import userEvent from "@testing-library/user-event";

describe("ActivityForm", () => {
  it("focuses on the 'Name' input by default", () => {
    render(<ActivityForm onSubmit={vi.fn()} submitButtonText="Submit" />);

    expect(screen.getByLabelText("Name *")).toHaveFocus();
  });

  it("shows default options when provided", () => {
    render(
      <ActivityForm
        onSubmit={vi.fn()}
        submitButtonText="Submit"
        initialValues={{
          avg_time_hours: 0,
          avg_time_minutes: 30,
          category_id: { value: 1, label: "Productive" },
          max_time_hours: 1,
          max_time_minutes: 0,
          name: "Test",
        }}
      />,
    );

    const avgTimeInputs = screen.getAllByLabelText("Avg. Time");
    const maxTimeInputs = screen.getAllByLabelText("Max. Time");

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByLabelText("Category *")).toHaveTextContent("Productive");

    expect(avgTimeInputs[0]).toHaveValue(0);
    expect(avgTimeInputs[1]).toHaveValue(30);

    expect(maxTimeInputs[0]).toHaveValue(1);
    expect(maxTimeInputs[1]).toHaveValue(0);
  });

  it("requires necessary values before submitting", async () => {
    const onSubmit = vi.fn();
    render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("A category must be selected")).toBeInTheDocument();
    expect(
      screen.getByText("Avg. Time must be at least 1 minute"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Max. Time must be at least 1 minute"),
    ).toBeInTheDocument();
  });
});
