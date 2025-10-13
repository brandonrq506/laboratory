import { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const { taskId } = Route.useParams();
  const navigateBack = useNavigateBack({ fallback: "/timer" });
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId));

  useEffect(() => setIsOpen(true), []);

  if (data.status === "scheduled")
    return (
      <Modal isOpen={isOpen} onClose={navigateBack}>
        <EditScheduledTaskForm task={data} />
      </Modal>
    );

  if (data.status === "in_progress") {
    return (
      <Modal isOpen={isOpen} onClose={navigateBack}>
        <EditInProgressTaskForm task={data} />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <EditCompletedTaskForm task={data} fallbackNavigation="/timer" />
    </Modal>
  );
}
