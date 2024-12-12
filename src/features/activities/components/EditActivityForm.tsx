import { useNavigate } from "react-router-dom";
import { useUpdateActivity } from "../api/tanstack/useUpdateActivity";

import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";

import { ACTIVITY } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";
import { convertTimeToSeconds } from "@/utils";

type Props = {
  activityId: number;
  initialValues?: Partial<CreateForm>;
};

export const EditActivityForm = ({ activityId, initialValues }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useUpdateActivity();

  const onSubmit = async (values: CreateForm) => {
    await mutateAsync({
      activityId,
      activity: {
        avg_time: convertTimeToSeconds(values.avg_time),
        category_id: values.category_id!.value,
        max_time: convertTimeToSeconds(values.max_time),
        name: values.name,
      },
    });

    navigate("..");
  };

  return (
    <ActivityForm
      submitButtonText={`${UPDATE} ${ACTIVITY}`}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
