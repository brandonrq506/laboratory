import { useNavigateBack } from "@/hooks";

import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/history/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/history" });

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <CreateTaskForm />
    </Modal>
  );
}
