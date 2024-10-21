import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CreateActivityForm } from "@/features/activities/components";
import { Modal } from "@/components/core";

export const NewActivityPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <CreateActivityForm
          initialValues={{ category_id: { value: 1, label: "Productive" } }}
        />
      </Modal>
    </div>
  );
};
