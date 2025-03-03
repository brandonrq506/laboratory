import { useCreateTask } from "@/features/tasks/api/tanstack/useCreateTask";
import { useForm } from "react-hook-form";
import { useStartTask } from "@/features/tasks/api/tanstack/useStartTask";

import { ActivityComboBox } from "@/features/activities/components";
import { IconButton } from "@/components/core";
import { Option } from "@/types/core";
import { PlayIcon } from "@heroicons/react/24/solid";

type FormValues = {
  activity_id: Option | null;
};

export const IdleTimer = () => {
  const { mutateAsync: createTask } = useCreateTask();
  const { mutate: startTask } = useStartTask();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      activity_id: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (data.activity_id) {
      const newTask = await createTask({ activity_id: data.activity_id.value });
      startTask(newTask.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <div className="w-full">
        <ActivityComboBox
          hideLabel
          control={control}
          name="activity_id"
          rules={{
            required: "Activity is required",
          }}
        />
      </div>

      <p className="text-gray-600 tabular-nums">0:00:00</p>

      <IconButton variant="primary" shape="circle" type="submit">
        <PlayIcon aria-hidden className="size-5" />
      </IconButton>
    </form>
  );
};
