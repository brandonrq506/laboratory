import { PageHeaderWithActions } from "@/components/layout";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ActivityTable } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { PlusIcon } from "@heroicons/react/24/outline";
import { activityListQueryOptions } from "@/features/activities/api/queries";

import { ACTIVITIES, ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";

export const Route = createFileRoute("/__protected/activities")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(activityListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeaderWithActions
        title={ACTIVITIES}
        actions={
          <LinkButton
            to="/activities/new"
            size="lg"
            startIcon={
              <PlusIcon className="size-5" aria-hidden />
            }>{`${ADD} ${ACTIVITY}`}</LinkButton>
        }
      />

      <ActivityTable />
      <Outlet />
    </div>
  );
}
