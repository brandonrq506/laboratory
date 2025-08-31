import { useForm } from "react-hook-form";

import { TextArea, TimeInputV2 } from "@/components/form";
import { ActivityComboBox } from "@/features/activities/components";
import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { CompletedTaskAPI } from "../types/completedTask";
import { CompletedTaskFormType } from "../types/completedTaskFormType";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

import { isAfter, parseISO } from "date-fns";

type Props = {
  initialValues: CompletedTaskFormType;
  onSubmit: (data: CompletedTaskFormType) => void;
  task: CompletedTaskAPI;
};

export const CompletedTaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { control, formState, getValues, handleSubmit, register } =
    useForm<CompletedTaskFormType>({
      values: initialValues,
    });
  const { isSubmitting, errors } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between gap-2">
        <ActivityComboBox control={control} name="activity" hideLabel />
        <CategoryBadge category={task.activity.category} />
      </div>

      <TextArea
        label="Notes:"
        autoComplete="off"
        rows={4}
        registration={register("note", {
          maxLength: {
            value: 250,
            message: "Note cannot exceed 250 characters.",
          },
        })}
        description="Max 250 characters"
        error={errors.note?.message}
      />

      <TimeInputV2
        label="Start Time"
        name="start_time"
        control={control}
        rules={{ required: "Start time is required." }}
      />

      <TimeInputV2
        label="End Time"
        name="end_time"
        control={control}
        rules={{
          required: "End time is required.",
          validate: {
            isAfterStartTime: (v) => {
              const { start_time } = getValues();
              const endTime = parseISO(v as string);
              const startTime = parseISO(start_time as string);

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
          {`${UPDATE} ${TASK}`}
        </Button>
      </div>
    </form>
  );
};
