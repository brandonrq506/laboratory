import { useNavigateBack } from "@/hooks";

import { CreateRoutineForm } from "@/features/routines/components/CreateRoutineForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/routines" });

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <CreateRoutineForm />
    </Modal>
  );
}
