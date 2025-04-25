import { render, screen } from "@/test/test-utils";
import { EditActivityForm } from "./EditActivityForm";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

describe("EditActivityForm", () => {
  it("removes one segment from the URL when closed", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/activities/edit/1",
        Component: () => (
          <EditActivityForm
            activityId={1}
            initialValues={{
              avg_time_hours: 1,
              avg_time_minutes: 0,
              name: "Test",
              category_id: { value: 1, label: "Productive" },
              max_time_hours: 2,
              max_time_minutes: 0,
            }}
          />
        ),
      },
      {
        path: "/",
        Component: () => <div>base page</div>,
      },
    ]);

    render(<Stub initialEntries={["/activities/edit/1"]} />);

    await user.click(screen.getByRole("button", { name: "Update Activity" }));

    expect(screen.getByText("base page")).toBeInTheDocument();
  });
});
