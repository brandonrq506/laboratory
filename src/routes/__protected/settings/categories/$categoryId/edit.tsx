import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Link, createFileRoute } from "@tanstack/react-router";
import { EditCategoryForm } from "@/features/categories/components";
import { Modal } from "@/components/core";
import { SectionHeaderWithAction } from "@/components/layout";
import { TrashIcon } from "@heroicons/react/24/outline";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";
import { getColorByName } from "@/features/colors/utils/getColorByName";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();
  const { data } = useSuspenseQuery(categoryByIdQueryOptions(categoryId));
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });

  const color = getColorByName(data.color);

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <SectionHeaderWithAction
        className="mb-4"
        title="Edit Category"
        action={
          <Link
            to="/settings/categories/$categoryId/delete"
            params={{ categoryId }}>
            <span className="sr-only">Delete Category</span>
            <TrashIcon className="size-5 text-red-600" />
          </Link>
        }
      />
      <EditCategoryForm
        categoryId={categoryId}
        initialValues={{
          name: data.name,
          color: { value: color.id, label: color.name },
        }}
      />
    </Modal>
  );
}
