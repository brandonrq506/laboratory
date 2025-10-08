import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/history/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/history" });

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <CreateTaskForm />
    </Modal>
  );
}
