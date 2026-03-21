import { useForm } from "react-hook-form";

import { Badge, Button } from "@/components/core";
import { DateInput, TextArea } from "@/components/form";
import { getToday, secondsToTime } from "@/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import { HeadingLarge } from "@/components/layout";
import { ScheduleForm } from "../types/schedule-form";
import { ScheduledTaskAPI } from "../types/scheduledTask";

import type { DirtyFields } from "@/types/core/form";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

interface Props {
  initialValues: ScheduleForm;
  onSubmit: (
    data: ScheduleForm,
    dirtyFields: DirtyFields<ScheduleForm>,
  ) => void;
  task: ScheduledTaskAPI;
}

export const ScheduledTaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { formState, handleSubmit, register } = useForm<ScheduleForm>({
    values: initialValues,
  });
  const { isSubmitting, errors, dirtyFields } = formState;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields))}>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <HeadingLarge title={task.activity.display_name} />
          <div className="flex gap-1 text-xs">
            <ClockIcon className="size-4" />
            <p className="tabular-nums">
              {secondsToTime(task.activity.exp_seconds)}
            </p>
          </div>
        </div>
        <Badge color={task.activity.category.color}>
          {task.activity.category.name}
        </Badge>
      </div>

      <br />

      <DateInput
        label="Scheduled"
        min={getToday()}
        registration={register("scheduled_at", {
          required: "Scheduled date is required.",
          min: {
            value: getToday(),
            message: "Date cannot be in the past.",
          },
        })}
        error={errors.scheduled_at?.message}
      />

      <br />

      <TextArea
        autoFocus={Boolean(!initialValues.note)}
        label="Notes"
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

      <div className="flex justify-center">
        <Button type="submit" disabled={isSubmitting}>
          {`${UPDATE} ${TASK}`}
        </Button>
      </div>
    </form>
  );
};
