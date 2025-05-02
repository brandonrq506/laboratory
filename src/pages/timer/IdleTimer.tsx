import { useCreateTask } from "@/features/tasks/api/tanstack/useCreateTask";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOnlineStatus } from "@/hooks";
import { useStartTask } from "@/features/tasks/api/tanstack/useStartTask";

import { ActivityComboBox } from "@/features/activities/components";
import { IdleTimerButton } from "./IdleTimerButton";
import { Option } from "@/types/core";

type FormValues = {
  activity_id: Option | null;
};

export const IdleTimer = () => {
  const isOnline = useOnlineStatus();
  const { mutateAsync: createTask, isError: isCreateError } = useCreateTask();
  const { mutateAsync: startTask, isError: isStartError } = useStartTask();
  const { control, formState, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      activity_id: null,
    },
  });

  const { isSubmitting } = formState;

  const isError = isCreateError || isStartError;

  const onSubmit = async (data: FormValues) => {
    if (!isOnline) return;

    if (data.activity_id) {
      const newTask = await createTask({ activity_id: data.activity_id.value });
      await startTask(newTask.id);
    }
  };

  useEffect(() => setFocus("activity_id"), [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <div className="w-full">
        <ActivityComboBox
          hideErrorMessage
          hideLabel
          control={control}
          name="activity_id"
          rules={{
            required: "Activity is required",
          }}
        />
      </div>

      <p className="text-gray-600 tabular-nums">0:00:00</p>

      <IdleTimerButton
        isError={isError}
        isOnline={isOnline}
        isPending={isSubmitting}
      />
    </form>
  );
};
