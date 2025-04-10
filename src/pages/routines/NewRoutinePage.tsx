import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CreateRoutineForm } from "@/features/routines/components/CreateRoutineForm";
import { Modal } from "@/components/core";

export const NewRoutinePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <CreateRoutineForm />
      </Modal>
    </div>
  );
};
