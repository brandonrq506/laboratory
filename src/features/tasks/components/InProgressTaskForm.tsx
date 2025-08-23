import { useForm } from "react-hook-form";

import { ActivityComboBox } from "@/features/activities/components";
import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { InProgressFormType } from "../types/inProgressFormType";
import { InProgressTaskAPI } from "../types/inProgressTask";
import { TimeInputV2 } from "@/components/form";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

import { isBefore, parseISO } from "date-fns";
import { floorSeconds } from "@/utils";

type Props = {
  initialValues: InProgressFormType;
  onSubmit: (data: InProgressFormType) => void;
  task: InProgressTaskAPI;
};

export const InProgressTaskForm = ({
  initialValues,
  task,
  onSubmit,
}: Props) => {
  const { control, formState, handleSubmit } = useForm<InProgressFormType>({
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
        control={control}
        label="Start Time"
        name="start_time"
        rules={{
          required: "Start time is required.",
          validate: {
            isPast: (v) => {
              // Flooring startTime and not 'now' to ensure even within the same minute, it is in the past.
              const startTime = floorSeconds(parseISO(v as string));
              const now = new Date();

              return (
                isBefore(startTime, now) || "Start time must be in the past"
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
