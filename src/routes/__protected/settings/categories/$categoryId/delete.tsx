import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { DeleteCategoryDialog } from "@/features/categories/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId/delete",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = Route.useNavigate();
  const { categoryId } = Route.useParams();

  useEffect(() => setIsOpen(true), []);

  return (
    <DeleteCategoryDialog
      isOpen={isOpen}
      onClose={navigateBack}
      onDelete={() => navigate({ to: "/settings/categories", replace: true })}
      categoryId={categoryId}
    />
  );
}
