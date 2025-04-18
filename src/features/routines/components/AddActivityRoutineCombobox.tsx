import { useCreateActivityRoutine } from "../api/tanstack/useCreateActivityRoutine";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { ActivityComboBox } from "@/features/activities/components";
import { Option } from "@/types/core";

export const AddActivityRoutineCombobox = () => {
  const { routineId } = useParams();
  const routineNumber = Number(routineId);
  const { mutate } = useCreateActivityRoutine();

  const { control, reset } = useForm({
    defaultValues: {
      activityId: null,
    },
  });

  if (!routineId) throw new Error("Routine ID is required");

  const onChangeSubmit = (activity: Option | null) => {
    if (!activity) return;

    mutate({
      activityId: activity.value,
      routineId: routineNumber,
    });

    reset();
  };

  return (
    <ActivityComboBox
      control={control}
      name="activityId"
      rules={{
        required: "Activity is required",
        onChange: (e) => onChangeSubmit(e.target.value),
      }}
    />
  );
};
