import { useNavigateBack } from "@/hooks";

import { CreateCategoryForm } from "@/features/categories/components/CreateCategoryForm";
import { Modal } from "@/components/core/Modal/Modal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/categories/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });

  return (
    <div>
      <Modal isOpen={true} onClose={navigateBack}>
        <CreateCategoryForm />
      </Modal>
    </div>
  );
}
