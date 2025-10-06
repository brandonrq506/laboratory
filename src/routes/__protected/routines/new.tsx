import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { CreateRoutineForm } from "@/features/routines/components/CreateRoutineForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/routines" });

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <CreateRoutineForm />
    </Modal>
  );
}
