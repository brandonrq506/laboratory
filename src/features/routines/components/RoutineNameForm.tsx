import { useForm } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateRoutine } from "../api/tanstack/useUpdateRoutine";

import { getRouteApi } from "@tanstack/react-router";
import { routineByIdQueryOptions } from "../api/queries";

import { Button } from "@/components/core";
import { EditNameForm } from "../types/editNameForm";
import { TextInput } from "@/components/form";
import { UPDATE } from "@/constants/actions";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const RoutineNameForm = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));
  const { mutateAsync, isPending } = useUpdateRoutine();

  const { formState, handleSubmit, register } = useForm<EditNameForm>({
    values: { name: data.name },
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: EditNameForm) => {
    await mutateAsync({
      routineId,
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
