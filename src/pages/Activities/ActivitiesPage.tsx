import { ActivityList } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { Outlet } from "react-router";
import { PageHeaderWithActions } from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/outline";

import { ACTIVITIES, ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";

export const ActivitiesPage = () => {
  return (
    <div>
      <PageHeaderWithActions
        className="mb-2"
        title={ACTIVITIES}
        actions={
          <LinkButton
            to="new"
            size="lg"
            startIcon={<PlusIcon className="size-5" aria-hidden />}>
            {`${ADD} ${ACTIVITY}`}
          </LinkButton>
        }
      />

      <ActivityList />
      <Outlet />
    </div>
  );
};
