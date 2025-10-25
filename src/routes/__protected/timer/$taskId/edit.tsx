import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  EditInProgressTaskForm,
  EditScheduledTaskForm,
} from "@/features/tasks/components";
import { EditCompletedTaskForm } from "@/features/tasks/components/EditCompletedTaskForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/timer/$taskId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const navigateBack = useNavigateBack({ fallback: "/timer" });
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId));

  if (data.status === "scheduled")
    return (
      <Modal isOpen={true} onClose={navigateBack}>
        <EditScheduledTaskForm task={data} />
      </Modal>
    );

  if (data.status === "in_progress") {
    return (
      <Modal isOpen={true} onClose={navigateBack}>
        <EditInProgressTaskForm task={data} />
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <EditCompletedTaskForm task={data} fallbackNavigation="/timer" />
    </Modal>
  );
}
