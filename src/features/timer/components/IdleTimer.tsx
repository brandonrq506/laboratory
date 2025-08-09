import { useCreateStartTask } from "@/features/tasks/api/tanstack/useCreateStartTask";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOnlineStatus } from "@/hooks";

import { ActivityComboBox } from "@/features/activities/components";
import { IdleTimerButton } from "./IdleTimerButton";
import { Option } from "@/types/core";
import { floorMilliseconds } from "@/utils";

type FormValues = {
  activity_id: Option | null;
};

export const IdleTimer = () => {
  const isOnline = useOnlineStatus();
  const { mutateAsync, isError } = useCreateStartTask();
  const { control, formState, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      activity_id: null,
    },
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data: FormValues) => {
    if (!isOnline) return;

    if (data.activity_id) {
      await mutateAsync({
        activity_id: data.activity_id.value,
        status: "in_progress",
        start_time: floorMilliseconds(new Date()).toISOString(),
      });
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
