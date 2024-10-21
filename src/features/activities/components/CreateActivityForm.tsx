import { useCreateActivity } from "../api/tanstack/useCreateActivity";
import { useNavigate } from "react-router-dom";

import { ACTIVITY } from "@/constants/entities";
import { ADD } from "@/constants/actions";
import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";

type Props = {
  initialValues?: Partial<CreateForm>;
};

export const CreateActivityForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateActivity();

  const onSubmit = async (values: CreateForm) => {
    await mutateAsync({
      avg_time: values.avg_time,
      category_id: values.category_id!.value,
      max_time: values.max_time,
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
