import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditScheduledTaskForm } from "@/features/tasks/components";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/scheduled/$taskId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId));
  const navigateBack = useNavigateBack({ fallback: "/scheduled" });

  if (data.status !== "scheduled") return null;

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <EditScheduledTaskForm task={data} fallbackNavigation="/scheduled" />
    </Modal>
  );
}
