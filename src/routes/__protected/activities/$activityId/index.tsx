import { useNavigateBack } from "@/hooks";

import { Modal } from "@/components/core";
import { SectionUnderConstruction } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/activities/$activityId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/activities" });

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <SectionUnderConstruction />
    </Modal>
  );
}
