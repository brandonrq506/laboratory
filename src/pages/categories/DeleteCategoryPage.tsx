import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { DeleteCategoryDialog } from "@/features/categories/components";

const BACK_TO_CATEGORIES = -2;
const BACK_TO_EDIT_MODAL = -1;

export const DeleteCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const categoryNumber = parseInt(categoryId!);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <DeleteCategoryDialog
      isOpen={isOpen}
      onClose={() => navigate(BACK_TO_EDIT_MODAL)}
      onDelete={() => navigate(BACK_TO_CATEGORIES)}
      categoryId={categoryNumber}
    />
  );
};
