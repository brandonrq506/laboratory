import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
          initialValues={{
            avg_time: "00:30",
            category_id: { value: 1, label: "Productive" },
            max_time: "01:00",
          }}
        />
      </Modal>
    </div>
  );
};
