import { useEffect, useState } from "react";
import { useCategories } from "@/features/categories/api/tanstack/useCategories";
import { useNavigate } from "react-router";

import { CreateActivityForm } from "@/features/activities/components";
import { Modal } from "@/components/core";
import { getFirstCategoryAsOption } from "@/features/categories/utils";

export const NewActivityPage = () => {
  const { data } = useCategories();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  const defaultCategory = getFirstCategoryAsOption(data);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <CreateActivityForm
          initialValues={{
            avg_time: "00:30",
            category_id: defaultCategory,
            max_time: "01:00",
          }}
        />
      </Modal>
    </div>
  );
};
