import { useUpdateCategory } from "../api/tanstack/useUpdateCategory";

import { CategoryForm } from "./CategoryForm";
import { EditForm } from "../types/editForm";
import { isColor } from "@/features/colors/utils/isColor";

type Props = {
  categoryId: number;
  initialValues?: Partial<EditForm>;
};

export const EditCategoryForm = ({ categoryId, initialValues }: Props) => {
  const { mutate } = useUpdateCategory();

  const onSubmit = (data: EditForm) => {
    const { name, color: possiblyColor } = data;
    const color = isColor(possiblyColor.label) ? possiblyColor.label : "white";

    mutate({
      category: { name, color },
      categoryId,
    });
  };

  return <CategoryForm initialValues={initialValues} onSubmit={onSubmit} />;
};
