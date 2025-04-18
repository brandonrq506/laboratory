import { Link, useParams } from "react-router";
import { PlayRoutineButton } from "@/features/routines/components";
import { TrashIcon } from "@heroicons/react/24/outline";

export const EditRoutineActions = () => {
  const { routineId } = useParams();
  const routineNumberID = Number(routineId);

  return (
    <div className="flex items-center justify-between">
      <Link to={`../delete/${routineNumberID}`}>
        <span className="sr-only">Delete Routine</span>
        <TrashIcon className="size-5 text-red-600" />
      </Link>
      <PlayRoutineButton routineId={routineNumberID} />
    </div>
  );
};
