import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { CompletedTaskAPI } from "../types/completedTask";
import { EditForm } from "../types/editForm";
import { InProgressTaskAPI } from "../types/inProgressTast";
import { TimeInputV2 } from "@/components/form";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

import { isInThePast } from "../utils/formValidations";

type Props = {
  initialValues: EditForm;
  onSubmit: (data: EditForm) => void;
  task: CompletedTaskAPI | InProgressTaskAPI;
};

export const TaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { control, formState, handleSubmit } = useForm<EditForm>({
    values: initialValues,
  });
  const { isSubmitting } = formState;

  const isCompletedTask = task.status === "completed";
  const isInProgressTask = task.status === "in_progress";

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex items-center justify-between">
        <p>{task.activity.name}</p>
        <CategoryBadge category={task.activity.category} />
      </div>

      {isInProgressTask && (
        <TimeInputV2
          step={1}
          label="Start Time"
          name="start_time"
          control={control}
          rules={{
            required: "Start time is required.",
            validate: {
              isPast: (v) => isInThePast(v!) || "Time set to the future",
            },
          }}
        />
      )}

      {isCompletedTask && (
        <TimeInputV2
          step={1}
          label="Start Time"
          name="start_time"
          control={control}
          rules={{
            required: "Start time is required.",
          }}
        />
      )}

      {isCompletedTask && (
        <TimeInputV2
          step={1}
          label="End Time"
          name="end_time"
          control={control}
          rules={{ required: "End time is required." }}
        />
      )}

      <div className="mt-2 flex justify-center">
        <Button type="submit" disabled={isSubmitting}>
          {`${UPDATE} ${TASK}`}
        </Button>
      </div>
    </form>
  );
};
