import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useUpdateRoutine } from "../api/tanstack/useUpdateRoutine";

import { Button } from "@/components/core";
import { EditNameForm } from "../types/editNameForm";
import { TextInput } from "@/components/form";
import { UPDATE } from "@/constants/actions";

const defaultValues: EditNameForm = {
  name: "",
};

interface Props {
  initialValues?: Partial<EditNameForm>;
  routineId?: number;
}

export const RoutineNameForm = ({ initialValues, routineId }: Props) => {
  const { formState, handleSubmit, register } = useForm<EditNameForm>({
    values: { ...defaultValues, ...initialValues },
  });
  const { errors, isSubmitting } = formState;
  const { routineId: routineIdFromParams } = useParams();
  const { mutateAsync, isPending } = useUpdateRoutine();

  const routineIdToUse = routineId || Number(routineIdFromParams);

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
        {UPDATE}
      </Button>
    </form>
  );
};
