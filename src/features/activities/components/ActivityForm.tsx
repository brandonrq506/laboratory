import { useForm } from "react-hook-form";

import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { CreateForm } from "../types/createForm";

const defaultActivity: CreateForm = {
  name: "",
  avg_time_hours: 0,
  avg_time_minutes: 0,
  max_time_hours: 0,
  max_time_minutes: 0,
  category_id: null,
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

        <div className="flex gap-1">
          <NumberInput
            label="Avg. Hours"
            placeholder="00"
            className="flex-auto"
            error={errors.avg_time_hours?.message}
            registration={register("avg_time_hours", {
              required: "At least 0 is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Hours can't be negative",
              },
              max: {
                value: 23,
                message: "Can't be longer than a day",
              },
            })}
          />
          <NumberInput
            label="Avg. Minutes"
            placeholder="30"
            className="flex-auto"
            error={errors.avg_time_minutes?.message}
            registration={register("avg_time_minutes", {
              required: "At least 0 is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Minutes can't be negative",
              },
              max: {
                value: 59,
                message: "Minutes must be less than an hour",
              },
              validate: {
                isNotZero: (value) => {
                  const { avg_time_hours } = getValues();
                  if (avg_time_hours === 0 && value === 0) {
                    return "Activities should take at least 1 minute";
                  }
                },
              },
            })}
          />
        </div>

        <div className="flex gap-1">
          <NumberInput
            label="Max. Hours"
            placeholder="01"
            className="flex-auto"
            error={errors.max_time_hours?.message}
            registration={register("max_time_hours", {
              required: "At least 0 is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Hours can't be negative",
              },
              max: {
                value: 23,
                message: "Can't be longer than a day",
              },
            })}
          />

          <NumberInput
            label="Max. Minutes"
            placeholder="30"
            className="flex-auto"
            error={errors.max_time_minutes?.message}
            registration={register("max_time_minutes", {
              required: "At least 0 is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Minutes can't be negative",
              },
              max: {
                value: 59,
                message: "Minutes must be less than an hour",
              },
              validate: {
                isNotZero: (value) => {
                  const { max_time_hours } = getValues();
                  if (max_time_hours === 0 && value === 0) {
                    return "Activities should take at least 1 minute";
                  }
                },
              },
            })}
          />
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <Button type="submit" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
