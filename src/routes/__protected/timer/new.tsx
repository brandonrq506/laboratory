import { useNavigateBack } from "@/hooks";

import { Modal } from "@/components/core";
import { NewTodayCompletedTaskForm } from "@/pages/Tasks/NewTodayCompletedTaskForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/timer/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/timer" });

  return (
    <div>
      <Modal isOpen={true} onClose={navigateBack}>
        <NewTodayCompletedTaskForm />
      </Modal>
    </div>
  );
}
