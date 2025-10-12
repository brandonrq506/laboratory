import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { CreateCategoryForm } from "@/features/categories/components/CreateCategoryForm";
import { Modal } from "@/components/core/Modal/Modal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/categories/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });

  useEffect(() => setIsOpen(true), []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={navigateBack}>
        <CreateCategoryForm />
      </Modal>
    </div>
  );
}
