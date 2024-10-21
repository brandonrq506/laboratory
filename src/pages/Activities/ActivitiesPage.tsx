import { ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";
import { ActivityList } from "@/features/activities/components";
import { LinkButton } from "@/components/core";
import { Outlet } from "react-router-dom";

export const ActivitiesPage = () => {
  return (
    <div>
      <LinkButton to="new" className="mb-2">{`${ADD} ${ACTIVITY}`}</LinkButton>

      <ActivityList />
      <Outlet />
    </div>
  );
};
