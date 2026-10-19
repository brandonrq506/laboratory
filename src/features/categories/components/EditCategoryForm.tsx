import { useNavigate } from "@tanstack/react-router";
import { useUpdateCategory } from "../api/tanstack/useUpdateCategory";

import { CategoryForm } from "./CategoryForm";
import type { EditForm } from "../types/editForm";

import { CATEGORY } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

type Props = {
  categoryId: number;
  initialValues?: Partial<EditForm>;
};

export const EditCategoryForm = ({ categoryId, initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useUpdateCategory();

  const onSubmit = async (data: EditForm) => {
    const { name, color } = data;

    await mutateAsync({
      category: { name, color },
      categoryId,
    });

    navigate({ to: "/settings/categories" });
  };

  return (
    <CategoryForm
      submitButtonText={`${UPDATE} ${CATEGORY}`}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
