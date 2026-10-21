import { useForm } from "react-hook-form";

import { TextArea, TimeInput, instantOnTransform } from "@/components/form";
import { ActivityComboBox } from "@/features/activities/components";
import type { NewTaskForm as FormType } from "../types/newTaskForm";

import { Button } from "@/components/core";
import { CREATE } from "@/constants/actions";
import { TASK } from "@/constants/entities";
import { useEffect } from "react";

import { isAfter, parseISO } from "date-fns";

interface Props {
  date: Date;
  initialValues: FormType;
  onSubmit: (data: FormType) => void;
}

export const NewTaskForm = ({ date, initialValues, onSubmit }: Props) => {
  const { control, formState, getValues, handleSubmit, register, setFocus } =
    useForm<FormType>({
      values: initialValues,
    });
  const { isSubmitting, errors } = formState;

  useEffect(() => setFocus("activity"), [setFocus]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex flex-col gap-y-2">
      <ActivityComboBox
        control={control}
        name="activity"
        hideLabel
        rules={{ required: "Please select an activity" }}
      />

      <TextArea
        label="Notes"
        autoComplete="off"
        registration={register("note", {
          maxLength: {
            value: 2000,
            message: "Max 2000 characters",
          },
        })}
        description="Max 2000 characters"
        error={errors.note?.message}
      />

      <TimeInput
        label="Start Time"
        name="start_time"
        control={control}
        transform={instantOnTransform(date)}
        rules={{ required: "Start time is required." }}
      />

      <TimeInput
        label="End Time"
        name="end_time"
        control={control}
        transform={instantOnTransform(date)}
        rules={{
          required: "End time is required.",
          validate: {
            isAfterStartTime: (v) => {
              const { start_time } = getValues();
              const endTime = parseISO(v as string);
              const startTime = parseISO(start_time);

              return (
                isAfter(endTime, startTime) ||
                "End time must be after start time"
              );
            },
          },
        }}
      />

      <div className="flex justify-center">
        <Button type="submit" disabled={isSubmitting}>
          {`${CREATE} ${TASK}`}
        </Button>
      </div>
    </form>
  );
};
