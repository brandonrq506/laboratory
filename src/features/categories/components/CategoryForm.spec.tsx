import { render, screen } from "@testing-library/react";
import { CategoryForm } from "./CategoryForm";
import userEvent from "@testing-library/user-event";

describe("CategoryForm", () => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  it("shows all 14 colors as options", async () => {
    const user = userEvent.setup();
    render(<CategoryForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getAllByRole("option")).toHaveLength(14);
  });

  it("shows default values when provided, ", async () => {
    const user = userEvent.setup();
    render(
      <CategoryForm
        onSubmit={vi.fn()}
        initialValues={{
          name: "Tester",
          color: { value: 4, label: "emerald" },
        }}
      />,
    );

    expect(screen.getByLabelText("Name *")).toHaveValue("Tester");
    expect(screen.getByRole("button")).toHaveTextContent("emerald");

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("option", { name: "emerald" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("displays 'save' and 'reset' buttons when the form is dirty", async () => {
    const user = userEvent.setup();
    render(<CategoryForm onSubmit={vi.fn()} />);

    expect(
      screen.queryByRole("button", { name: /save/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /reset/i }),
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText("Name *"), "Tester");

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("requires a name", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CategoryForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: "emerald" }));

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with the correct data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CategoryForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("option", { name: "emerald" }));

    await user.type(screen.getByLabelText("Name *"), "Tester");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Tester",
      color: { value: 4, label: "emerald", disabled: false },
    });
  });

  it("resets the form when the 'reset' button is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText("Name *"), "Tester");
    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByLabelText("Name *")).toHaveValue("");
  });
});
