import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { Modal } from "@/components/core";
import { SectionUnderConstruction } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/activities/$activityId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/activities" });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <SectionUnderConstruction />
    </Modal>
  );
}
