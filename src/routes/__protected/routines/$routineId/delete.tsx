import { useNavigateBack } from "@/hooks";

import { DeleteRoutineDialog } from "@/features/routines/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/$routineId/delete")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const navigateBack = useNavigateBack({ fallback: "/routines" });
  const navigate = Route.useNavigate();
  const { routineId } = Route.useParams();

  return (
    <DeleteRoutineDialog
      isOpen={true}
      onClose={navigateBack}
      onDelete={() => navigate({ to: "/routines", replace: true })}
      routineId={routineId}
    />
  );
}
