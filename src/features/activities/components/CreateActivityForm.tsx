import { useCreateActivity } from "../api/tanstack/useCreateActivity";
import { useNavigate } from "react-router";

import { ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";
import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";
import { convertDurationToSeconds } from "@/utils";

type Props = {
  initialValues?: Partial<CreateForm>;
};

export const CreateActivityForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateActivity();

  const onSubmit = async (values: CreateForm) => {
    await mutateAsync({
      avg_time: convertDurationToSeconds(
        values.avg_time_hours,
        values.avg_time_minutes,
      ),
      category_id: values.category_id!.value,
      max_time: convertDurationToSeconds(
        values.max_time_hours,
        values.max_time_minutes,
      ),
      name: values.name,
    });

    navigate("..");
  };

  return (
    <ActivityForm
      submitButtonText={`${ADD} ${ACTIVITY}`}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
