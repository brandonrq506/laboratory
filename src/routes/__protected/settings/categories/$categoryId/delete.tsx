import { useDeleteCategory } from "@/features/categories/api/tanstack/useDeleteCategory";
import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ProtectedConfirmationModal } from "@/components/core";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId/delete",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });

  const { categoryId } = Route.useParams();
  const { data } = useSuspenseQuery(categoryByIdQueryOptions(categoryId));
  const { mutate, isPending } = useDeleteCategory();

  const handleDelete = () => {
    mutate(categoryId, {
      onSuccess: () => navigate({ to: "/settings/categories", replace: true }),
    });
  };

  return (
    <ProtectedConfirmationModal
      isOpen={true}
      onClose={navigateBack}
      onConfirm={handleDelete}
      confirmValue={data.name}
      isPending={isPending}
      title="Delete Category"
      description="Deleting a category deletes all the activities and tasks associated with it. This action cannot be undone."
    />
  );
}
