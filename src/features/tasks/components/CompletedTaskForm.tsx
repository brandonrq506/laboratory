import { useForm } from "react-hook-form";

import { ActivityComboBox } from "@/features/activities/components";
import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { CompletedTaskAPI } from "../types/completedTask";
import { CompletedTaskFormType } from "../types/completedTaskFormType";
import { TimeInputV2 } from "@/components/form";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

import { isAfter, parseISO } from "date-fns";

type Props = {
  initialValues: CompletedTaskFormType;
  onSubmit: (data: CompletedTaskFormType) => void;
  task: CompletedTaskAPI;
};

export const CompletedTaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { control, formState, getValues, handleSubmit } =
    useForm<CompletedTaskFormType>({
      values: initialValues,
    });
  const { isSubmitting } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between gap-2">
        <ActivityComboBox control={control} name="activity" hideLabel />
        <CategoryBadge category={task.activity.category} />
      </div>

      {task.note && (
        <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200">
          <ChatBubbleLeftEllipsisIcon className="size-4 flex-none text-gray-400" />
          <p className="leading-snug whitespace-pre-line">{task.note}</p>
        </div>
      )}

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
