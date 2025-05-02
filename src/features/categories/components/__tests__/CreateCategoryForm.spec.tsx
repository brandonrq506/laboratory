import { render, screen } from "@/test/test-utils";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

import { CreateCategoryForm } from "../CreateCategoryForm";

describe("CreateCategoryForm", () => {
  it("renders the form with the initial values", () => {
    const Stub = createRoutesStub([
      {
        path: "/categories/new",
        Component: () => (
          <CreateCategoryForm
            initialValues={{ name: "Test", color: { value: 2, label: "rose" } }}
          />
        ),
      },
    ]);

    render(<Stub initialEntries={["/categories/new"]} />);

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByDisplayValue("rose")).toBeInTheDocument();
  });

  it("takes the user to the previous page after submitting the form", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/categories/new",
        Component: () => (
          <CreateCategoryForm
            initialValues={{
              color: { value: 1, label: "white" },
            }}
          />
        ),
      },
      {
        path: "/",
        Component: () => <div>Categories Page</div>,
      },
    ]);

    render(<Stub initialEntries={["/categories/new"]} />);

    await user.type(screen.getByLabelText("Name *"), "Test Category");

    const button = screen.getByRole("button", { name: "Add Category" });

    await user.click(button);

    expect(screen.getByText("Categories Page")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name *")).not.toBeInTheDocument();
  });
});
