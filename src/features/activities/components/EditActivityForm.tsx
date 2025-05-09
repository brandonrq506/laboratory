import { useNavigate } from "react-router";
import { useUpdateActivity } from "../api/tanstack/useUpdateActivity";

import { ActivityForm } from "./ActivityForm";
import { CreateForm } from "../types/createForm";

import { ACTIVITY } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";
import { convertHHandMMtoSeconds } from "../utils/convertHHandMMtoSeconds";

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
        avg_time: convertHHandMMtoSeconds({
          hours: values.avg_time_hours,
          minutes: values.avg_time_minutes,
        }),
        category_id: values.category_id!.value,
        max_time: convertHHandMMtoSeconds({
          hours: values.max_time_hours,
          minutes: values.max_time_minutes,
        }),
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
