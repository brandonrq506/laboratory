import { useForm } from "react-hook-form";

import { DurationInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { CreateForm } from "../types/createForm";

const defaultActivity: CreateForm = {
  name: "",
  avg_time_hours: 0,
  avg_time_minutes: 0,
  category_id: null,
  max_time_hours: 0,
  max_time_minutes: 0,
};

type Props = {
  initialValues?: Partial<CreateForm>;
  onSubmit: (data: CreateForm) => void;
  submitButtonText: string;
};

export const ActivityForm = ({
  initialValues,
  onSubmit,
  submitButtonText,
}: Props) => {
  const { control, formState, getValues, handleSubmit, register } =
    useForm<CreateForm>({
      values: { ...defaultActivity, ...initialValues },
    });
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          autoFocus
          showAsterisk
          label="Name"
          placeholder="Shower"
          error={errors.name?.message}
          registration={register("name", {
            required: "Name is required",
          })}
        />

        <CategorySelect
          control={control}
          name="category_id"
          rules={{ required: "A category must be selected" }}
        />

        <DurationInput
          label="Avg. Time"
          error={
            errors.avg_time_minutes?.message || errors.avg_time_hours?.message
          }
          hoursProps={{ placeholder: "00" }}
          minutesProps={{ placeholder: "30" }}
          hoursregistration={register("avg_time_hours", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Hours must be at least 0",
            },
            max: {
              value: 23,
              message: "Hours must be less than 24",
            },
          })}
          minutesregistration={register("avg_time_minutes", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Minutes must be at least 0",
            },
            max: {
              value: 59,
              message: "Minutes must be less than 60",
            },
            validate: {
              isNotZero: (value) => {
                const { avg_time_hours } = getValues();
                if (avg_time_hours === 0 && value === 0) {
                  return "Avg. Time must be at least 1 minute";
                }
              },
            },
          })}
        />

        <DurationInput
          label="Max. Time"
          error={
            errors.max_time_minutes?.message || errors.max_time_hours?.message
          }
          hoursProps={{ placeholder: "01" }}
          minutesProps={{ placeholder: "30" }}
          hoursregistration={register("max_time_hours", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Hours must be at least 0",
            },
            max: {
              value: 23,
              message: "Hours must be less than 24",
            },
          })}
          minutesregistration={register("max_time_minutes", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Minutes must be at least 0",
            },
            max: {
              value: 59,
              message: "Minutes must be less than 60",
            },
            validate: {
              isNotZero: (value) => {
                const { max_time_hours } = getValues();
                if (max_time_hours === 0 && value === 0) {
                  return "Max. Time must be at least 1 minute";
                }
              },
            },
          })}
        />
      </div>

      <div className="mt-2 flex justify-center">
        <Button type="submit" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
