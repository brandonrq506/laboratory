import { render, screen } from "@testing-library/react";
import { CategoryForm } from "../CategoryForm";
import userEvent from "@testing-library/user-event";

describe("CategoryForm", () => {
  it("shows all 14 colors as options", async () => {
    const user = userEvent.setup();
    render(<CategoryForm onSubmit={vi.fn()} submitButtonText="Add Category" />);

    await user.click(screen.getByRole("button", { name: "Color" }));

    expect(screen.getAllByRole("option")).toHaveLength(14);
  });

  it("shows default values when provided, ", async () => {
    const user = userEvent.setup();
    render(
      <CategoryForm
        submitButtonText="Add Category"
        onSubmit={vi.fn()}
        initialValues={{
          name: "Tester",
          color: { value: 4, label: "emerald" },
        }}
      />,
    );

    const colorSelect = screen.getByRole("button", { name: "Color" });

    expect(screen.getByLabelText("Name *")).toHaveValue("Tester");

    expect(colorSelect).toHaveTextContent("emerald");

    await user.click(colorSelect);

    expect(screen.getByRole("option", { name: "emerald" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("requires a name", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <CategoryForm submitButtonText="Add Category" onSubmit={onSubmit} />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));

    await user.click(screen.getByRole("option", { name: "emerald" }));

    await user.click(screen.getByRole("button", { name: /add category/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with the correct data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <CategoryForm submitButtonText="Add Category" onSubmit={onSubmit} />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("option", { name: "emerald" }));

    await user.type(screen.getByLabelText("Name *"), "Tester");
    await user.click(screen.getByRole("button", { name: /add category/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Tester",
      color: { value: 4, label: "emerald", disabled: false },
    });
  });
});
