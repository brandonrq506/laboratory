import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { DeleteRoutineDialog } from "@/features/routines/components";

const BACK_TO_EDIT_MODAL = -1;

export const DeleteRoutinePage = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const routineNumber = parseInt(routineId!);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <DeleteRoutineDialog
      isOpen={isOpen}
      onClose={() => navigate(BACK_TO_EDIT_MODAL)}
      onDelete={() => navigate("/routines", { replace: true })}
      routineId={routineNumber}
    />
  );
};
