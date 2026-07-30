import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditCompletedTaskForm } from "@/features/tasks/components/EditCompletedTaskForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

export const Route = createFileRoute("/__protected/history/$taskId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId));
  const navigateBack = useNavigateBack({ fallback: "/history" });

  if (data.status !== TASK_STATUS.COMPLETED) return null;

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <EditCompletedTaskForm task={data} fallbackNavigation="/history" />
    </Modal>
  );
}
