import { useNavigateBack } from "@/hooks";

import { Modal } from "@/components/core";
import { NewTodayCompletedTaskForm } from "@/pages/Tasks/NewTodayCompletedTaskForm";
import { createFileRoute } from "@tanstack/react-router";
import { getPageTitle } from "@/utils";

export const Route = createFileRoute("/__protected/timer/new")({
  head: () => ({ meta: [{ title: getPageTitle("New Completed Task") }] }),
  staticData: { modal: true },
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
