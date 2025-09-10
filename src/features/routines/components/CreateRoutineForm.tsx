import { useCreateRoutine } from "../api/tanstack/useCreateRoutine";
import { useNavigate } from "react-router";

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
          navigate(`/routines/edit/${data.id}`);
        },
      },
    );
  };

  return (
    <RoutineForm submitButtonText={`${ADD} ${ROUTINE}`} onSubmit={onSubmit} />
  );
};
