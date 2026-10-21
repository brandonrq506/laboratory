import { HttpResponse, http } from "msw";
import { nestableRoutineCandidates, routines } from "@/test/store/routines";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@/test/test-utils";
import { activities } from "@/test/store/activities";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";
import userEvent from "@testing-library/user-event";

import { AddRoutineItemMenu } from "../add-routine-item-menu";

const ROUTINE_ID = routines[0].id;
const candidates = nestableRoutineCandidates.filter(
  ({ id }) => id !== ROUTINE_ID,
);

// Badge text is appended to the name without whitespace in the accessible name.
const routineItemName = (name: string) => new RegExp(`^${name}\\s*Routine$`);

const openMenu = async () => {
  const user = userEvent.setup();

  render(<AddRoutineItemMenu routineId={ROUTINE_ID} />);

  await waitForElementToBeRemoved(() => screen.queryByRole("status"));
  await user.click(screen.getByRole("button", { name: "Add Items" }));

  return user;
};

const captureCreateBody = () => {
  const bodies: unknown[] = [];

  server.use(
    http.post(apiRoutes.routineItems, async ({ request }) => {
      bodies.push(await request.json());
      return HttpResponse.json({}, { status: 201 });
    }),
  );

  return bodies;
};

describe("AddRoutineItemMenu", () => {
  it("adds the activity when an activity is clicked", async () => {
    const bodies = captureCreateBody();
    const activity = activities[0];
    const user = await openMenu();

    await user.click(
      screen.getByRole("menuitem", {
        name: new RegExp(`^${activity.display_name}`),
      }),
    );

    await waitFor(() => {
      expect(bodies).toEqual([{ activity_id: activity.id }]);
    });
  });

  it("nests the routine when a routine is clicked", async () => {
    const bodies = captureCreateBody();
    const [candidate] = candidates;
    const user = await openMenu();

    await user.click(
      screen.getByRole("menuitem", { name: routineItemName(candidate.name) }),
    );

    await waitFor(() => {
      expect(bodies).toEqual([{ nested_routine_id: candidate.id }]);
    });
  });

  it("shows an error when nestable routines fail to load", async () => {
    server.use(
      http.get(apiRoutes.routineNestableCandidates, () =>
        HttpResponse.json({ error: "Server error" }, { status: 500 }),
      ),
    );

    render(<AddRoutineItemMenu routineId={ROUTINE_ID} />);

    expect(await screen.findByText("Error loading items")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add Items" }),
    ).not.toBeInTheDocument();
  });
});
