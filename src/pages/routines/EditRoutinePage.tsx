import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useRoutine } from "@/features/routines/api/tanstack/useRoutine";

import { Loading, Modal } from "@/components/core";
import {
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { TrashIcon } from "@heroicons/react/24/outline";

export const EditRoutinePage = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const routineNumber = parseInt(routineId!);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError } = useRoutine(routineNumber);

  useEffect(() => setIsOpen(true), []);

  if (!routineId) throw new Error("Category ID is required");

  if (isPending) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <Loading className="mx-auto" />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>There was an error loading the routine.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      <RoutineNameForm initialValues={{ name: data.name }} />
      <br />
      <RoutineActivityList />
      <br />
      <Link to={`../delete/${routineNumber}`}>
        <span className="sr-only">Delete Routine</span>
        <TrashIcon className="size-5 text-red-600" />
      </Link>
    </Modal>
  );
};
