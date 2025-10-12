import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import {
  AddActivityRoutineMenu,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { HeadingMedium, SectionHeaderWithAction } from "@/components/layout";
import { EditRoutineActions } from "@/pages/routines/EditRoutinePage/EditRoutineActions";
import { Modal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/$routineId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { routineId } = Route.useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/routines" });

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={navigateBack}>
      <HeadingMedium
        title="Edit Routine"
        description="Customize your routine by updating the name and managing activities"
      />
      <br />
      <RoutineNameForm />
      <br />
      <SectionHeaderWithAction
        title="Activities"
        action={<AddActivityRoutineMenu routineId={Number(routineId)} />}
      />
      <RoutineActivityList />
      <br />
      <EditRoutineActions />
    </Modal>
  );
}
