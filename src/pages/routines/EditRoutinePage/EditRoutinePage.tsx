import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  AddActivityRoutineCombobox,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
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
      <RoutineNameForm />
      <div className="my-2.5">
        <AddActivityRoutineCombobox routineId={routineNumber} />
      </div>
      <RoutineActivityList />
      <br />
      <EditRoutineActions />
    </Modal>
  );
};
