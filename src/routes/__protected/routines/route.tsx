import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button, LinkButton } from "@/components/core";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { PageHeaderWithActions } from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/outline";
import { routineListQueryOptions } from "@/features/routines/api/queries";

import { ADD } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";
import { RoutineCard } from "@/features/routines/components";

export const Route = createFileRoute("/__protected/routines")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(routineListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(routineListQueryOptions());
  const [showHidden, setShowHidden] = useState(false);

  const btnText = showHidden ? "Show Visible" : "Show Hidden";

  const routinesToShow = showHidden
    ? data.filter((routine) => routine.hidden_at)
    : data.filter((routine) => !routine.hidden_at);

  return (
    <div>
      <PageHeaderWithActions
        title="Routines"
        className="mb-2"
        actions={
          <>
            <LinkButton
              to="/routines/new"
              size="lg"
              startIcon={<PlusIcon className="size-5" aria-hidden />}>
              {`${ADD} ${ROUTINE}`}
            </LinkButton>
            <Button onClick={() => setShowHidden(!showHidden)}>
              {btnText}
            </Button>
          </>
        }
      />

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {routinesToShow.map((routine) => {
          return (
            <Link
              key={routine.id}
              to="/routines/$routineId/edit"
              params={{ routineId: routine.id }}
              className="max-h-56 w-full xl:max-w-md">
              <RoutineCard routine={routine} />
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}
