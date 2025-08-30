import { useForm } from "react-hook-form";

import { Badge, Button } from "@/components/core";
import { ClockIcon } from "@heroicons/react/24/outline";
import { EditNoteForm } from "../types/editNoteForm";
import { PageHeader } from "@/components/layout";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { TextArea } from "@/components/form";
import { secondsToTime } from "@/utils";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

interface Props {
  initialValues: EditNoteForm;
  onSubmit: (data: EditNoteForm) => void;
  task: ScheduledTaskAPI;
}

export const ScheduledTaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { formState, handleSubmit, register } = useForm<EditNoteForm>({
    values: initialValues,
  });
  const { isSubmitting, errors } = formState;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <PageHeader title={task.activity.name} />
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

      <TextArea
        autoFocus={Boolean(!initialValues.note)}
        label="Notes:"
        autoComplete="off"
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
