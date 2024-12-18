import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Modal } from "@/components/core";

export const NewTaskPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        [287] This is a work in progress
      </Modal>
    </div>
  );
};
