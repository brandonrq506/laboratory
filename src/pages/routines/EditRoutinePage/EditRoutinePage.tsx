import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  AddActivityRoutineCombobox,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { EditRoutineActions } from "./EditRoutineActions";
import { Modal } from "@/components/core";

export const EditRoutinePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      <RoutineNameForm />
      <div className="my-2.5">
        <AddActivityRoutineCombobox />
      </div>
      <RoutineActivityList />
      <br />
      <EditRoutineActions />
    </Modal>
  );
};
