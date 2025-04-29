import { render, screen } from "@/test/test-utils";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

import { NewCategoryButton } from "./NewCategoryButton";

describe("NewCategoryButton", () => {
  it("navigates to the new category page when clicked", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/categories",
        Component: () => <NewCategoryButton />,
      },
      {
        path: "/categories/new",
        Component: () => <div>New Category Page</div>,
      },
    ]);

    render(<Stub initialEntries={["/categories"]} />);

    const button = screen.getByRole("link", { name: "Add Category" });

    await user.click(button);

    expect(screen.getByText("New Category Page")).toBeInTheDocument();
  });
});
