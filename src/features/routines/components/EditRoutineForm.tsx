import { useForm } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateRoutine } from "../api/tanstack/useUpdateRoutine";

import { getRouteApi } from "@tanstack/react-router";
import { routineByIdQueryOptions } from "../api/queries";

import type { EditRoutineForm as FormType } from "../types/routine-form";

import { TextInput, TimeInputV3 } from "@/components/form";
import { Button } from "@/components/core";
import { UPDATE } from "@/constants/actions";

const routeApi = getRouteApi("/__protected/routines/$routineId/edit");

export const EditRoutineForm = () => {
  const { routineId } = routeApi.useParams();
  const { data } = useSuspenseQuery(routineByIdQueryOptions(routineId));
  const { mutateAsync, isPending } = useUpdateRoutine();

  const { control, formState, handleSubmit, register } = useForm<FormType>({
    values: { name: data.name, start_time: data.start_time ?? "" },
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: FormType) => {
    await mutateAsync({
      routineId,
      routine: {
        name: values.name,
        start_time: values.start_time === "" ? null : values.start_time,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-between">
      <TextInput
        showAsterisk
        label="Name"
        placeholder="Morning Routine"
        error={errors.name?.message}
        registration={register("name", {
          required: "Name is required",
        })}
      />

      <TimeInputV3 control={control} name="start_time" label="Start Time" />

      <Button type="submit" disabled={isSubmitting} isLoading={isPending}>
        {UPDATE}
      </Button>
    </form>
  );
};
