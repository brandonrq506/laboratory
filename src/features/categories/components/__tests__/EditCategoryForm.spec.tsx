import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { Outlet, createRoutesStub } from "react-router";

import { EditCategoryForm } from "../EditCategoryForm";

describe("EditCategoryForm", () => {
  it("renders the form with the initial values", () => {
    const Stub = createRoutesStub([
      {
        path: "settings/categories/edit/:categoryId",
        Component: () => (
          <EditCategoryForm
            categoryId={1}
            initialValues={{ name: "Test", color: { value: 2, label: "rose" } }}
          />
        ),
      },
    ]);

    render(<Stub initialEntries={["/settings/categories/edit/1"]} />);

    expect(screen.getByLabelText("Name *")).toHaveValue("Test");
    expect(screen.getByDisplayValue("rose")).toBeInTheDocument();
  });

  it("takes the user to the previous page after submitting the form", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <Outlet />,
        children: [
          {
            path: "settings",
            Component: () => <Outlet />,
            children: [
              {
                path: "categories",
                Component: () => <Outlet />,
                children: [
                  {
                    path: "edit/:categoryId",
                    Component: () => (
                      <EditCategoryForm
                        categoryId={1}
                        initialValues={{
                          color: { value: 1, label: "white" },
                        }}
                      />
                    ),
                  },
                  {
                    index: true,
                    Component: () => <div>Categories Page</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);

    render(<Stub initialEntries={["/settings/categories/edit/1"]} />);

    await user.type(screen.getByLabelText("Name *"), "Test Category");

    const button = screen.getByRole("button", { name: "Update Category" });

    await user.click(button);

    expect(await screen.findByText("Categories Page")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByLabelText("Name *")).not.toBeInTheDocument(),
    );
  });
});
