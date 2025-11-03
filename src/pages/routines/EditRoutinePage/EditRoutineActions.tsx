import { useSuspenseQuery } from "@tanstack/react-query";

import {
  HideRoutineButton,
  UnhideRoutineButton,
} from "@/features/routines/components";
import { Link, getRouteApi } from "@tanstack/react-router";
import { TrashIcon } from "@heroicons/react/24/outline";
import { routineByIdQueryOptions } from "@/features/routines/api/queries";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const EditRoutineActions = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));

  const isHidden = Boolean(data.hidden_at);

  return (
    <div className="flex items-center justify-between">
      <Link to="/routines/$routineId/delete" params={{ routineId }}>
        <span className="sr-only">Delete Routine</span>
        <TrashIcon className="size-5 text-red-600" />
      </Link>
      {isHidden ? (
        <UnhideRoutineButton routineId={routineId} />
      ) : (
        <HideRoutineButton routineId={routineId} />
      )}
    </div>
  );
};
