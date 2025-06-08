import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Modal } from "@/components/core";
import { NewTodayCompletedTaskForm } from "./NewTodayCompletedTaskForm";

export const NewTodayCompletedTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
        <NewTodayCompletedTaskForm />
      </Modal>
    </div>
  );
};
