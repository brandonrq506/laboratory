import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { activities } from "@/test/store/activities";
import { routines } from "@/test/store/routines";
import userEvent from "@testing-library/user-event";

import { AddScheduledTaskMenu } from "../AddScheduledTaskMenu";

import {
  INSERT_MODE,
  type InsertMode,
} from "@/features/tasks/types/insert-mode";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

const visibleRoutines = routines.filter(
  (routine) => routine.hidden_at === null,
);

beforeEach(() => {
  server.use(
    http.get(apiRoutes.routines, () => HttpResponse.json(visibleRoutines)),
  );
});

describe("AddScheduledTaskMenu", () => {
  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  const renderAddScheduledTaskMenu = (
    insertMode: InsertMode = INSERT_MODE.APPEND,
  ) => {
    const queryClient = createTestQueryClient();

    const utils = render(
      <QueryClientProvider client={queryClient}>
        <AddScheduledTaskMenu insertMode={insertMode} />
      </QueryClientProvider>,
    );

    const user = userEvent.setup();

    return { ...utils, user, queryClient };
  };

  it("displays routines list", async () => {
    const { user } = renderAddScheduledTaskMenu();

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText("Routines")).toBeInTheDocument();
    expect(screen.getByText("Activities")).toBeInTheDocument();
  });

  it("shows loading indicator when applying routine", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(apiRoutes.routineApply, async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("shows loading indicator only for the clicked routine", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(apiRoutes.routineApply, async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    expect(screen.getByText("Workout")).toBeInTheDocument();

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    const loadingIndicator = screen.getAllByRole("status");

    expect(loadingIndicator).toHaveLength(1);
    expect(screen.getByText("Morning")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();
  });

  it("clears loading state on error", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(apiRoutes.routineApply, async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json({ error: "Server error" }, { status: 500 });
      }),
    );

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("hides routines without activities", async () => {
    const { user } = renderAddScheduledTaskMenu();

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    expect(screen.queryByText("Swimming")).not.toBeInTheDocument();
  });

  it("sends insert_mode when creating scheduled task", async () => {
    let requestBody: Record<string, unknown> | null = null;
    const activity = activities[0];
    const { user } = renderAddScheduledTaskMenu(INSERT_MODE.PREPEND);

    server.use(
      http.post(apiRoutes.tasks, async ({ request }) => {
        requestBody = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText(activity.display_name)).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("menuitem", { name: new RegExp(activity.display_name) }),
    );

    await waitFor(() => {
      expect(requestBody).toEqual({
        activity_id: activity.id,
        insert_mode: INSERT_MODE.PREPEND,
      });
    });
  });

  it("sends insert_mode when applying routine", async () => {
    let requestBody: Record<string, unknown> | null = null;
    const { user } = renderAddScheduledTaskMenu(INSERT_MODE.PREPEND);

    server.use(
      http.post(apiRoutes.routineApply, async ({ request }) => {
        requestBody = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("menuitem", { name: "Morning Routine" }));

    await waitFor(() => {
      expect(requestBody).toEqual({ insert_mode: INSERT_MODE.PREPEND });
    });
  });
});
