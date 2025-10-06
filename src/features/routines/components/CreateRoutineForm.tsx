import { useCreateRoutine } from "../api/tanstack/useCreateRoutine";
import { useNavigate } from "@tanstack/react-router";

import { ADD } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";
import { RoutineForm } from "./RoutineForm";

import { RoutineForm as RoutineFormType } from "../types/routineForm";

export const CreateRoutineForm = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateRoutine();

  const onSubmit = async (values: RoutineFormType) => {
    await mutateAsync(
      { name: values.name },
      {
        onSuccess(data) {
          navigate({
            to: "/routines/$routineId/edit",
            params: { routineId: String(data.id) },
          });
        },
      },
    );
  };

  return (
    <RoutineForm submitButtonText={`${ADD} ${ROUTINE}`} onSubmit={onSubmit} />
  );
};
