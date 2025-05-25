import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";
import { Modal } from "@/components/core";

export const NewTaskPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setIsOpen(true), []);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
      <CreateTaskForm />
    </Modal>
  );
};
