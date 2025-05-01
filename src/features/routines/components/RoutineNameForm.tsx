import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useRoutine } from "../api/tanstack/useRoutine";
import { useUpdateRoutine } from "../api/tanstack/useUpdateRoutine";

import { Button } from "@/components/core";
import { EditNameForm } from "../types/editNameForm";
import { TextInput } from "@/components/form";
import { UPDATE } from "@/constants/actions";

const defaultValues: EditNameForm = {
  name: "",
};

interface Props {
  routineId?: number;
}

export const RoutineNameForm = ({ routineId }: Props) => {
  const { routineId: routineIdFromParams } = useParams();
  const routineIdToUse = routineId || Number(routineIdFromParams);

  const { data, isPending: isDataPending } = useRoutine(routineIdToUse);
  const nameToUse = data?.name ?? defaultValues.name;

  const { formState, handleSubmit, register } = useForm<EditNameForm>({
    values: { name: nameToUse },
  });
  const { errors, isSubmitting } = formState;
  const { mutateAsync, isPending } = useUpdateRoutine();

  const onSubmit = async (values: EditNameForm) => {
    await mutateAsync({
      routineId: routineIdToUse,
      routine: values,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-between">
      <TextInput
        hideLabel
        showAsterisk
        label="Name"
        placeholder="Morning Routine"
        error={errors.name?.message}
        registration={register("name", {
          required: "Name is required",
        })}
      />

      <Button type="submit" disabled={isSubmitting} isLoading={isPending}>
        {isDataPending ? "Loading..." : UPDATE}
      </Button>
    </form>
  );
};
