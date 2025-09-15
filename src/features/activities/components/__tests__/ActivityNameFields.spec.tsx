import { render, screen } from "@/test/test-utils";
import { ActivityForm } from "../ActivityForm";
import userEvent from "@testing-library/user-event";

describe("ActivityNameFields", () => {
  it("auto fills display name from name when left blank", async () => {
    const user = userEvent.setup();
    render(<ActivityForm onSubmit={vi.fn()} submitButtonText="Submit" />);

    const nameInput = screen.getByLabelText("Name *");
    const displayNameInput = screen.getByLabelText("Display Name");

    await user.type(nameInput, "Morning Run");
    await user.tab();

    expect(displayNameInput).toHaveValue("Morning Run");

    await user.clear(displayNameInput);
    await user.type(displayNameInput, "   ");

    await user.click(nameInput);
    await user.tab();

    expect(displayNameInput).toHaveValue("Morning Run");
  });

  it("allows overriding display name without further auto fills", async () => {
    const user = userEvent.setup();
    render(<ActivityForm onSubmit={vi.fn()} submitButtonText="Submit" />);

    const nameInput = screen.getByLabelText("Name *");
    const displayNameInput = screen.getByLabelText("Display Name");

    await user.type(nameInput, "Morning Run");
    await user.tab();

    await user.clear(displayNameInput);
    await user.type(displayNameInput, "Evening Routine");

    await user.click(nameInput);
    await user.clear(nameInput);
    await user.type(nameInput, "Morning Routine");
    await user.tab();

    expect(displayNameInput).toHaveValue("Evening Routine");
  });

  it("does not auto fill when the name was not modified", async () => {
    const user = userEvent.setup();
    render(
      <ActivityForm
        onSubmit={vi.fn()}
        submitButtonText="Submit"
        initialValues={{ name: "Existing" }}
      />,
    );

    const displayNameInput = screen.getByLabelText("Display Name");

    await user.tab();

    expect(displayNameInput).toHaveValue("");
  });

  it("keeps display name when name is cleared after auto fill", async () => {
    const user = userEvent.setup();
    render(<ActivityForm onSubmit={vi.fn()} submitButtonText="Submit" />);

    const nameInput = screen.getByLabelText("Name *");
    const displayNameInput = screen.getByLabelText("Display Name");

    await user.type(nameInput, "Morning Run");
    await user.tab();

    expect(displayNameInput).toHaveValue("Morning Run");

    await user.click(nameInput);
    await user.clear(nameInput);
    await user.tab();

    expect(displayNameInput).toHaveValue("Morning Run");
  });

  it("does not overwrite pre-filled display name values", async () => {
    const user = userEvent.setup();
    render(
      <ActivityForm
        onSubmit={vi.fn()}
        submitButtonText="Submit"
        initialValues={{ name: "Morning Run", display_name: "Saved" }}
      />,
    );

    const nameInput = screen.getByLabelText("Name *");
    const displayNameInput = screen.getByLabelText("Display Name");

    await user.click(nameInput);
    await user.clear(nameInput);
    await user.type(nameInput, "Updated Name");
    await user.tab();

    expect(displayNameInput).toHaveValue("Saved");
  });
});
