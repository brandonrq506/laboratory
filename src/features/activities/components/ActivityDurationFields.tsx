import { useFormContext } from "react-hook-form";

import { CreateForm } from "../types/create-form";
import { NumberInput } from "@/components/form";

export const ActivityDurationFields = () => {
  const {
    formState: { errors },
    getValues,
    register,
  } = useFormContext<CreateForm>();

  return (
    <>
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
    </>
  );
};
