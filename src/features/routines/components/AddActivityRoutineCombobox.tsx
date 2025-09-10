import { useCreateActivityRoutine } from "../api/tanstack/useCreateActivityRoutine";
import { useForm } from "react-hook-form";

import { ActivityComboBox } from "@/features/activities/components";
import { Option } from "@/types/core";

interface Props {
  routineId: number;
}

export const AddActivityRoutineCombobox = ({ routineId }: Props) => {
  const { mutate } = useCreateActivityRoutine();

  const { control, reset } = useForm({
    defaultValues: {
      activityId: null,
    },
  });

  const onChangeSubmit = (activity: Option) => {
    mutate({ activityId: activity.value, routineId });

    reset();
  };

  return (
    <ActivityComboBox
      control={control}
      name="activityId"
      description="Search and add activities to your routine"
      rules={{
        required: "Activity is required",
        onChange: (e) => onChangeSubmit(e.target.value),
      }}
    />
  );
};
