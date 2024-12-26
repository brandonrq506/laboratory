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
          avg_time: "00:30",
          category_id: { value: 1, label: "Productive" },
          max_time: "01:00",
          name: "Test",
        }}
      />,
    );

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByLabelText("Category *")).toHaveTextContent("Productive");
    expect(screen.getByLabelText("Avg. Time")).toHaveValue("00:30");
    expect(screen.getByLabelText("Max. Time")).toHaveValue("01:00");
  });

  it("requires necessary values before submitting", async () => {
    const onSubmit = vi.fn();
    render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("A category must be selected")).toBeInTheDocument();
    expect(
      screen.getByText("Required to handle thresholds"),
    ).toBeInTheDocument();
  });
});
