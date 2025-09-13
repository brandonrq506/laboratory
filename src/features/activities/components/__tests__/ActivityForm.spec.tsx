import { render, screen } from "@/test/test-utils";
import { ActivityForm } from "../ActivityForm";
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
          exp_time_hours: 0,
          exp_time_minutes: 30,
          category_id: { value: 1, label: "Productive" },
          max_time_hours: 1,
          max_time_minutes: 0,
          name: "Test",
        }}
      />,
    );

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByLabelText("Category *")).toHaveTextContent("Productive");
    expect(screen.getByLabelText("Exp. Hours")).toHaveValue(0);
    expect(screen.getByLabelText("Exp. Minutes")).toHaveValue(30);
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
          exp_time_hours: 0,
          exp_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Exp. Hours"));
    await user.type(screen.getByLabelText("Exp. Hours"), "24");

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
          exp_time_hours: 0,
          exp_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Exp. Minutes"));
    await user.type(screen.getByLabelText("Exp. Minutes"), "60");

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
          exp_time_hours: 0,
          exp_time_minutes: 30,
          max_time_hours: 1,
          max_time_minutes: 0,
        }}
      />,
    );

    await user.clear(screen.getByLabelText("Exp. Hours"));
    await user.type(screen.getByLabelText("Exp. Hours"), "-1");

    await user.clear(screen.getByLabelText("Max. Hours"));
    await user.type(screen.getByLabelText("Max. Hours"), "-1");

    await user.clear(screen.getByLabelText("Exp. Minutes"));
    await user.type(screen.getByLabelText("Exp. Minutes"), "-1");

    await user.clear(screen.getByLabelText("Max. Minutes"));
    await user.type(screen.getByLabelText("Max. Minutes"), "-1");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getAllByText("Hours can't be negative")).toHaveLength(2);

    await user.clear(screen.getByLabelText("Exp. Hours"));
    await user.type(screen.getByLabelText("Exp. Hours"), "2");

    await user.clear(screen.getByLabelText("Max. Hours"));
    await user.type(screen.getByLabelText("Max. Hours"), "2");

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
          exp_time_hours: 0,
          exp_time_minutes: 0,
          max_time_hours: 1,
          max_time_minutes: 30,
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Exp. Minutes")).toHaveFocus();
    expect(
      screen.getByText("Activities should take at least 1 minute"),
    ).toBeInTheDocument();
  });

  describe("Auto-populate Display Name", () => {
    it("auto-fills Display Name when Name field is changed and loses focus if Display Name is empty", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(nameInput, "Morning Run");
      await user.tab();

      expect(displayNameInput).toHaveValue("Morning Run");
    });

    it("treats whitespace-only Display Name as empty and auto-fills", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(displayNameInput, "   ");
      await user.type(nameInput, "Workout");
      await user.tab();

      expect(displayNameInput).toHaveValue("Workout");
    });

    it("only auto-fills if Name field was changed during current session", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <ActivityForm
          onSubmit={onSubmit}
          submitButtonText="Submit"
          initialValues={{ name: "Initial Name" }}
        />,
      );

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      // Focus and blur without changing anything
      await user.click(nameInput);
      await user.tab();

      expect(displayNameInput).toHaveValue("");
    });

    it("does not overwrite existing Display Name content", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(displayNameInput, "Custom Display");
      await user.type(nameInput, "Original Name");
      await user.tab();

      expect(displayNameInput).toHaveValue("Custom Display");
    });

    it("allows free editing of Display Name after auto-fill", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      // Auto-fill first
      await user.type(nameInput, "Swimming");
      await user.tab();
      expect(displayNameInput).toHaveValue("Swimming");

      // Then edit Display Name
      await user.clear(displayNameInput);
      await user.type(displayNameInput, "Pool Workout");

      // Change Name again and blur
      await user.clear(nameInput);
      await user.type(nameInput, "New Name");
      await user.tab();

      // Display Name should not change
      expect(displayNameInput).toHaveValue("Pool Workout");
    });

    it("auto-fills again if Display Name is cleared and Name is changed", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      // First auto-fill
      await user.type(nameInput, "Cycling");
      await user.tab();
      expect(displayNameInput).toHaveValue("Cycling");

      // Clear Display Name
      await user.clear(displayNameInput);

      // Change Name and blur again
      await user.clear(nameInput);
      await user.type(nameInput, "Road Cycling");
      await user.tab();

      expect(displayNameInput).toHaveValue("Road Cycling");
    });

    it("does not auto-fill if Name is cleared", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(nameInput, "Running");
      await user.clear(nameInput);
      await user.tab();

      expect(displayNameInput).toHaveValue("");
    });

    it("works with keyboard navigation (Tab)", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(nameInput, "Keyboard Test");
      await user.keyboard("{Tab}");

      expect(displayNameInput).toHaveValue("Keyboard Test");
    });

    it("works with mouse click to change focus", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ActivityForm onSubmit={onSubmit} submitButtonText="Submit" />);

      const nameInput = screen.getByLabelText("Name *");
      const displayNameInput = screen.getByLabelText("Display Name");

      await user.type(nameInput, "Mouse Test");
      await user.click(displayNameInput);

      expect(displayNameInput).toHaveValue("Mouse Test");
    });
  });
});
