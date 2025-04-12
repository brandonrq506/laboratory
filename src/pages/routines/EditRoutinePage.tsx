import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Loading, Modal } from "@/components/core";
import {
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { useRoutine } from "@/features/routines/api/tanstack/useRoutine";

export const EditRoutinePage = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError } = useRoutine(Number(routineId));

  useEffect(() => setIsOpen(true), []);

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
    </Modal>
  );
};
