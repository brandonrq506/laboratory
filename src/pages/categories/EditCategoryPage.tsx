import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Loading, Modal } from "@/components/core";
import { EditCategoryForm } from "@/features/categories/components";
import { SectionHeaderWithAction } from "@/components/layout";
import { TrashIcon } from "@heroicons/react/24/outline";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";
import { getColorByName } from "@/features/colors/utils/getColorByName";

export const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const categoryNumber = parseInt(categoryId!);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError, error } = useQuery(
    categoryByIdQueryOptions(categoryNumber),
  );

  useEffect(() => setIsOpen(true), []);

  if (!categoryId) throw new Error("Category ID is required");

  if (isPending)
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <Loading className="mx-auto" />
      </Modal>
    );

  if (isError) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        Error loading category: {error.message}
      </Modal>
    );
  }

  const color = getColorByName(data.color);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      <SectionHeaderWithAction
        className="mb-4"
        title="Edit Category"
        action={
          <Link to={`../delete/${categoryNumber}`}>
            <span className="sr-only">Delete Category</span>
            <TrashIcon className="size-5 text-red-600" />
          </Link>
        }
      />
      <EditCategoryForm
        categoryId={categoryNumber}
        initialValues={{
          name: data.name,
          color: { value: color.id, label: color.name },
        }}
      />
    </Modal>
  );
};
