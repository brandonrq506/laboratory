import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { CreateActivityForm } from "@/features/activities/components";
import { Modal } from "@/components/core";
import { categoryListQueryOptions } from "@/features/categories/api/queries";
import { getFirstCategoryAsOption } from "@/features/categories/utils";

export const NewActivityPage = () => {
  const { data } = useQuery(categoryListQueryOptions());
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  const defaultCategory = getFirstCategoryAsOption(data);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <CreateActivityForm
          initialValues={{
            exp_time_minutes: 30,
            category_id: defaultCategory,
            max_time_hours: 1,
          }}
        />
      </Modal>
    </div>
  );
};
