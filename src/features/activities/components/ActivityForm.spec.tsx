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

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByLabelText("Category *")).toHaveTextContent("Productive");
    expect(screen.getByLabelText("Avg. Hours")).toHaveValue(0);
    expect(screen.getByLabelText("Avg. Minutes")).toHaveValue(30);
    expect(screen.getByLabelText("Max. Hours")).toHaveValue(1);
    expect(screen.getByLabelText("Max. Minutes")).toHaveValue(0);
  });

  it("requires necessary values before submitting", async () => {
    const onSubmit = vi.fn();
    render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("A category must be selected")).toBeInTheDocument();
    expect(
      screen.getAllByText("Activities should take at least 1 minute"),
    ).toHaveLength(2);
  });

  it("does not allow Hours to be greater than 23", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <ActivityForm
        onSubmit={onSubmit}
        submitButtonText="Submit"
        initialValues={{
          name: "Test",
          category_id: { value: 1, label: "Productive" },
          avg_time_hours: 0,
          avg_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Avg. Hours"));
    await user.type(screen.getByLabelText("Avg. Hours"), "24");

    await user.clear(screen.getByLabelText("Max. Hours"));
    await user.type(screen.getByLabelText("Max. Hours"), "24");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getAllByText("Can't be longer than a day")).toHaveLength(2);
  });

  it("does not allow Minutes to be greater than 59", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <ActivityForm
        onSubmit={onSubmit}
        submitButtonText="Submit"
        initialValues={{
          name: "Test",
          category_id: { value: 1, label: "Productive" },
          avg_time_hours: 0,
          avg_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Avg. Minutes"));
    await user.type(screen.getByLabelText("Avg. Minutes"), "60");

    await user.clear(screen.getByLabelText("Max. Minutes"));
    await user.type(screen.getByLabelText("Max. Minutes"), "60");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      screen.getAllByText("Minutes must be less than an hour"),
    ).toHaveLength(2);
  });

  it("does not allow negative values for Hours or Minutes", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <ActivityForm
        onSubmit={onSubmit}
        submitButtonText="Submit"
        initialValues={{
          name: "Test",
          category_id: { value: 1, label: "Productive" },
          avg_time_hours: 0,
          avg_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Avg. Hours"));
    await user.type(screen.getByLabelText("Avg. Hours"), "-1");

    await user.clear(screen.getByLabelText("Max. Hours"));
    await user.type(screen.getByLabelText("Max. Hours"), "-1");

    await user.clear(screen.getByLabelText("Avg. Minutes"));
    await user.type(screen.getByLabelText("Avg. Minutes"), "-1");

    await user.clear(screen.getByLabelText("Max. Minutes"));
    await user.type(screen.getByLabelText("Max. Minutes"), "-1");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getAllByText("Hours can't be negative")).toHaveLength(2);
    expect(screen.getAllByText("Minutes can't be negative")).toHaveLength(2);
  });

  it("focuses on the minutes input when hours and minutes are both 0", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <ActivityForm
        onSubmit={onSubmit}
        submitButtonText="Submit"
        initialValues={{
          name: "Test",
          category_id: { value: 1, label: "Productive" },
          avg_time_hours: 0,
          avg_time_minutes: 0,
          max_time_hours: 1,
          max_time_minutes: 30,
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Avg. Minutes")).toHaveFocus();
    expect(
      screen.getByText("Activities should take at least 1 minute"),
    ).toBeInTheDocument();
  });
});
