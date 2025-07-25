import { useForm } from "react-hook-form";

import { TextArea, TimeInputV3 } from "@/components/form";
import { ActivityComboBox } from "@/features/activities/components";
import { NewTaskForm as FormType } from "../types/newTaskForm";

import { Button } from "@/components/core";
import { CREATE } from "@/constants/actions";
import { TASK } from "@/constants/entities";
import { splitHHMM } from "@/utils";
import { useEffect } from "react";

interface Props {
  initialValues: FormType;
  onSubmit: (data: FormType) => void;
}

export const NewTaskForm = ({ initialValues, onSubmit }: Props) => {
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
        label="Notes:"
        autoComplete="off"
        registration={register("note", {
          maxLength: {
            value: 100,
            message: "Max 100 characters",
          },
        })}
        description="Max 100 characters"
        error={errors.note?.message}
      />

      <TimeInputV3
        label="Start Time"
        name="start_time"
        control={control}
        rules={{ required: "Start time is required." }}
      />

      <TimeInputV3
        label="End Time"
        name="end_time"
        control={control}
        rules={{
          required: "End time is required.",
          validate: {
            isAfterStartTime: (v) => {
              const { start_time } = getValues();
              const [startHours, startMinutes] = splitHHMM(start_time);
              const [endHours, endMinutes] = splitHHMM(v as string);

              if (startHours > endHours)
                return "End time must be after start time";

              if (startHours === endHours && startMinutes >= endMinutes)
                return "End time must be after start time";

              return true;
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
