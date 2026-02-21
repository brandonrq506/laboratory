import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EyeIcon, EyeSlashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ResponsiveButton, ResponsiveLinkButton } from "@/components/core";
import { PageHeaderWithActions } from "@/components/layout";
import { routineListQueryOptions } from "@/features/routines/api/queries";

import { ADD } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";
import { RoutineTable } from "@/features/routines/components";

export const Route = createFileRoute("/__protected/routines")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(routineListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(routineListQueryOptions());
  const [showHidden, setShowHidden] = useState(false);

  const btnText = showHidden ? "Show Visible" : "Show Hidden";
  const Icon = showHidden ? EyeIcon : EyeSlashIcon;
  const title = showHidden ? "Hidden Routines" : "Routines";

  const routinesToShow = showHidden
    ? data.filter((routine) => routine.hidden_at)
    : data.filter((routine) => !routine.hidden_at);

  return (
    <div>
      <PageHeaderWithActions
        title={title}
        className="mb-2"
        actions={
          <>
            <ResponsiveLinkButton
              to="/routines/new"
              size="lg"
              startIcon={<PlusIcon className="size-5" aria-hidden />}>
              {`${ADD} ${ROUTINE}`}
            </ResponsiveLinkButton>
            <ResponsiveButton
              onClick={() => setShowHidden((prev) => !prev)}
              startIcon={<Icon className="size-5" aria-hidden />}>
              {btnText}
            </ResponsiveButton>
          </>
        }
      />

      <RoutineTable routines={routinesToShow} />

      <Outlet />
    </div>
  );
}
