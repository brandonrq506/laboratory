import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import { DeleteRoutineDialog } from "@/features/routines/components";
import { createFileRoute } from "@tanstack/react-router";
import { ensureValidId } from "@/utils";

export const Route = createFileRoute("/__protected/routines/$routineId/delete")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/routines" });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = Route.useNavigate();
  const { routineId } = Route.useParams();

  useEffect(() => setIsOpen(true), []);

  const routineNumber = ensureValidId(routineId);

  return (
    <DeleteRoutineDialog
      isOpen={isOpen}
      onClose={navigateBack}
      onDelete={() => navigate({ to: "/routines", replace: true })}
      routineId={routineNumber}
    />
  );
}
