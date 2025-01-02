import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { CompletedTaskAPI } from "../types/completedTask";
import { EditForm } from "../types/editForm";
import { InProgressTaskAPI } from "../types/inProgressTast";
import { TimeInput } from "@/components/form";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

type Props = {
  initialValues: EditForm;
  onSubmit: (data: EditForm) => void;
  task: CompletedTaskAPI | InProgressTaskAPI;
};

export const TaskForm = ({ initialValues, task, onSubmit }: Props) => {
  const { formState, handleSubmit, register } = useForm<EditForm>({
    defaultValues: initialValues,
  });
  const { isSubmitting } = formState;

  const isCompletedTask = task.status === "completed";

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex items-center justify-between">
        <p>{task.activity.name}</p>
        <CategoryBadge category={task.activity.category} />
      </div>

      <TimeInput
        label="Start Time"
        step={1}
        registration={register("start_time", {
          required: "Start time is required.",
        })}
      />

      {isCompletedTask && (
        <TimeInput
          label="End Time"
          step={1}
          registration={register("end_time", {
            required: "End time is required.",
            shouldUnregister: true,
          })}
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
