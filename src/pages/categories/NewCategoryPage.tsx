import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CreateCategoryForm } from "@/features/categories/components";
import { Modal } from "@/components/core";

export const NewCategoryPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <CreateCategoryForm />
      </Modal>
    </div>
  );
};
