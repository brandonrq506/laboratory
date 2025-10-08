import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { Modal } from "@/components/core";
import { NewTodayCompletedTaskForm } from "@/pages/Tasks/NewTodayCompletedTaskForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/timer/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/timer" });

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={navigateBack}>
        <NewTodayCompletedTaskForm />
      </Modal>
    </div>
  );
}
