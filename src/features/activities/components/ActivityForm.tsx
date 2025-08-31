import { useForm } from "react-hook-form";

import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { CreateForm } from "../types/createForm";

const defaultActivity: CreateForm = {
  category_id: null,
  display_name: "",
  exp_time_hours: 0,
  exp_time_minutes: 0,
  max_time_hours: 0,
  max_time_minutes: 0,
  name: "",
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
          description="Used for reports and exports."
          error={errors.name?.message}
          registration={register("name", { required: "Name is required" })}
        />

        <TextInput
          label="Display Name"
          placeholder="Shower"
          description="What you will see on the UI."
          error={errors.display_name?.message}
          registration={register("display_name")}
        />

        <CategorySelect
          control={control}
          name="category_id"
          rules={{ required: "A category must be selected" }}
        />

        <div>
          <div className="flex gap-1">
            <NumberInput
              label="Exp. Hours"
              placeholder="00"
              hideErrorMessage
              className="flex-auto"
              error={errors.exp_time_hours?.message}
              registration={register("exp_time_hours", {
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
              label="Exp. Minutes"
              placeholder="30"
              hideErrorMessage
              className="flex-auto"
              error={errors.exp_time_minutes?.message}
              registration={register("exp_time_minutes", {
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
                    const { exp_time_hours } = getValues();
                    if (exp_time_hours === 0 && value === 0) {
                      return "Activities should take at least 1 minute";
                    }
                  },
                },
              })}
            />
          </div>
          <div role="alert" className="mt-2 text-sm font-light text-red-600">
            {errors.exp_time_hours?.message || errors.exp_time_minutes?.message}
          </div>
        </div>

        <div>
          <div className="flex gap-1">
            <NumberInput
              label="Max. Hours"
              placeholder="01"
              hideErrorMessage
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
              hideErrorMessage
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
          <div role="alert" className="mt-2 text-sm font-light text-red-600">
            {errors.max_time_hours?.message || errors.max_time_minutes?.message}
          </div>
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
