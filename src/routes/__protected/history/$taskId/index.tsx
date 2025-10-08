import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditCompletedTaskForm } from "@/features/tasks/components";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/history/$taskId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { taskId } = Route.useParams();
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId));
  const navigateBack = useNavigateBack({ fallback: "/history" });

  useEffect(() => setIsOpen(true), []);

  if (data.status !== "completed") return null;

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <EditCompletedTaskForm task={data} fallbackNavigation="/history" />
    </Modal>
  );
}
