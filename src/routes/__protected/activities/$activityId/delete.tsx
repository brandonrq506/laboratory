import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DeleteActivityDialog } from "@/features/activities/components/DeleteActivityDialog";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/activities/$activityId/delete",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { activityId } = Route.useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/activities" });
  const { data } = useSuspenseQuery(activityByIdQueryOptions(activityId));

  useEffect(() => setIsOpen(true), []);

  return (
    <DeleteActivityDialog
      isOpen={isOpen}
      onClose={navigateBack}
      activity={data}
    />
  );
}
