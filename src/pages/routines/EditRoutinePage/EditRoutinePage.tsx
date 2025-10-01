import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  AddActivityRoutineMenu,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { HeadingMedium, SectionHeaderWithAction } from "@/components/layout";
import { EditRoutineActions } from "./EditRoutineActions";
import { Modal } from "@/components/core";

export const EditRoutinePage = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const routineNumber = Number(routineId);

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      <HeadingMedium
        title="Edit Routine"
        description="Customize your routine by updating the name and managing activities"
      />
      <br />
      <RoutineNameForm />
      <br />
      <SectionHeaderWithAction
        title="Activities"
        action={<AddActivityRoutineMenu routineId={routineNumber} />}
      />
      <RoutineActivityList />
      <br />
      <EditRoutineActions />
    </Modal>
  );
};
