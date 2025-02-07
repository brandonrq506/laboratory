import { useCreateCategory } from "../api/tanstack/useCreateCategory";
import { useNavigate } from "react-router";

import { CategoryForm } from "./CategoryForm";
import { EditForm } from "../types/editForm";
import { isColor } from "@/features/colors/utils/isColor";

import { ADD } from "@/constants/actions";
import { CATEGORY } from "@/constants/entities";

type Props = {
  initialValues?: Partial<EditForm>;
};

export const CreateCategoryForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateCategory();

  const onSubmit = async (data: EditForm) => {
    const { name, color: possiblyColor } = data;
    const color = isColor(possiblyColor.label) ? possiblyColor.label : "white";

    await mutateAsync({ name, color });
    navigate("..");
  };

  return (
    <CategoryForm
      submitButtonText={`${ADD} ${CATEGORY}`}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
