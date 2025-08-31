import { useNavigate } from "react-router";
import { useUpdateActivity } from "../api/tanstack/useUpdateActivity";

import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";

import { ACTIVITY } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";
import { hhmmToSeconds } from "../utils/hhmmToSeconds";

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
        exp_seconds: hhmmToSeconds({
          hours: values.exp_time_hours,
          minutes: values.exp_time_minutes,
        }),
        category_id: values.category_id!.value,
        max_seconds: hhmmToSeconds({
          hours: values.max_time_hours,
          minutes: values.max_time_minutes,
        }),
        display_name: values.display_name,
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
