import { useCreateCategory } from "../api/tanstack/useCreateCategory";
import { useNavigate } from "@tanstack/react-router";

import { CategoryForm } from "./CategoryForm";
import type { EditForm } from "../types/editForm";

import { ADD } from "@/constants/actions";
import { CATEGORY } from "@/constants/entities";

type Props = {
  initialValues?: Partial<EditForm>;
};

export const CreateCategoryForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateCategory();

  const onSubmit = async (data: EditForm) => {
    const { name, color } = data;

    await mutateAsync({ name, color });
    navigate({ to: "/settings/categories" });
  };

  return (
    <CategoryForm
      submitButtonText={`${ADD} ${CATEGORY}`}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
