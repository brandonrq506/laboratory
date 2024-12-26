import { render, screen } from "@/test/test-utils";
import { ActivityActionMenu } from "./ActivityActionMenu";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

describe("ActivityActionMenu", () => {
  it("redirects to edit page when clicking on update", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/activities",
        Component: () => <ActivityActionMenu activityId={1} />,
      },
      {
        path: "/activities/edit/1",
        Component: () => <div>edit page</div>,
      },
    ]);
    render(<Stub initialEntries={["/activities"]} />);

    await user.click(screen.getByRole("button", { name: "Open options" }));
    await user.click(screen.getByRole("menuitem", { name: "Update Activity" }));

    expect(screen.getByText("edit page")).toBeInTheDocument();
  });

  it("opens delete dialog when clicking on delete", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/activities",
        Component: () => <ActivityActionMenu activityId={1} />,
      },
    ]);
    render(<Stub initialEntries={["/activities"]} />);

    await user.click(screen.getByRole("button", { name: "Open options" }));
    await user.click(screen.getByRole("menuitem", { name: "Delete Activity" }));

    expect(
      screen.getByRole("dialog", { name: "Delete Activity" }),
    ).toBeInTheDocument();
  });
});
