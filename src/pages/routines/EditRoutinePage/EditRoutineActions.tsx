import { Link, getRouteApi } from "@tanstack/react-router";
import { PlayRoutineButton } from "@/features/routines/components";
import { TrashIcon } from "@heroicons/react/24/outline";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const EditRoutineActions = () => {
  const { routineId } = routeApi.useParams();

  return (
    <div className="flex items-center justify-between">
      <Link to="/routines/$routineId/delete" params={{ routineId }}>
        <span className="sr-only">Delete Routine</span>
        <TrashIcon className="size-5 text-red-600" />
      </Link>
      <PlayRoutineButton routineId={Number(routineId)} />
    </div>
  );
};
