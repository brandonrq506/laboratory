import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";
import { DurationInput } from "@/components/form/DurationInput/DurationInput";

type FormData = {
  hours: number;
  minutes: number;
};

export const DurationInputForm = () => {
  const { control, formState, handleSubmit, getValues, register } =
    useForm<FormData>({
      defaultValues: {
        hours: 2,
        minutes: 30,
      },
    });
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormData) => data;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DurationInput
          className="w-1/3"
          label="Avg. Duration"
          description="Format is hh:mm"
          error={errors.minutes?.message || errors.hours?.message}
          hoursProps={{ placeholder: "01" }}
          minutesProps={{ placeholder: "30" }}
          hoursregistration={register("hours", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Hours must be at least 0",
            },
            max: {
              value: 23,
              message: "Hours must be less than 24",
            },
            deps: ["minutes"],
          })}
          minutesregistration={register("minutes", {
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
                const { hours } = getValues();
                if (hours === 0 && value === 0) {
                  return "Duration must be at least 1 minute";
                }
              },
            },
          })}
        />

        {isSubmitSuccessful && (
          <div className="text-green-500">Form submitted successfully!</div>
        )}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
