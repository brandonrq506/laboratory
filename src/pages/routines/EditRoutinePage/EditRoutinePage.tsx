import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  AddActivityRoutineCombobox,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { PageHeader, PageSubheader } from "@/components/layout";
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
      <PageHeader title="Edit Routine" />
      <PageSubheader text="Customize your routine by updating the name and managing activities" />
      <br />
      <RoutineNameForm />
      <div className="my-2.5">
        <AddActivityRoutineCombobox routineId={routineNumber} />
      </div>
      <br />
      <RoutineActivityList />
      <br />
      <EditRoutineActions />
    </Modal>
  );
};
