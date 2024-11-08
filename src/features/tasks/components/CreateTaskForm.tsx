import { useCreateTask } from "../api/tanstack/useCreateTask";
import { useForm } from "react-hook-form";

import { ActivityComboBox } from "@/features/activities/components";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";
import { Option } from "@/types/core";
import { PlusIcon } from "@heroicons/react/24/outline";

import { CREATE } from "@/constants/actions";
import { TASK } from "@/constants/entities";

type FormValues = {
  activity: null | Option;
};

export const CreateTaskForm = () => {
  const { mutate } = useCreateTask();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      activity: null,
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({ activity_id: values.activity!.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
        <ActivityComboBox
          control={control}
          name="activity"
          rules={{ required: "Activity is required" }}
        />
        <Button
          type="submit"
          size="lg"
          className="flex-none"
          startIcon={<PlusIcon className="size-5" aria-hidden />}>
          {`${CREATE} ${TASK}`}
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
