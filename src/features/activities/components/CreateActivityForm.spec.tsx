import { render, screen } from "@/test/test-utils";
import { CreateActivityForm } from "./CreateActivityForm";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

describe("CreateActivityForm", () => {
  it("removes one segment from the URL when closed", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/activities/new",
        Component: () => (
          <CreateActivityForm
            initialValues={{
              name: "Test",
              category_id: { value: 1, label: "Productive" },
              avg_time: "01:00",
              max_time: "02:00",
            }}
          />
        ),
      },
      {
        path: "/",
        Component: () => <div>base page</div>,
      },
    ]);
    render(<Stub initialEntries={["/activities/new"]} />);

    await user.click(screen.getByRole("button", { name: "Add Activity" }));

    expect(screen.getByText("base page")).toBeInTheDocument();
  });
});
