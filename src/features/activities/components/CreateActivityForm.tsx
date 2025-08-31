import { useCreateActivity } from "../api/tanstack/useCreateActivity";
import { useNavigate } from "react-router";

import { ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";
import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";
import { hhmmToSeconds } from "../utils/hhmmToSeconds";

type Props = {
  initialValues?: Partial<CreateForm>;
};

export const CreateActivityForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateActivity();

  const onSubmit = async (values: CreateForm) => {
    await mutateAsync({
      display_name: values.display_name || values.name,
      category_id: values.category_id!.value,
      exp_seconds: hhmmToSeconds({
        hours: values.exp_time_hours,
        minutes: values.exp_time_minutes,
      }),
      max_seconds: hhmmToSeconds({
        hours: values.max_time_hours,
        minutes: values.max_time_minutes,
      }),
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
