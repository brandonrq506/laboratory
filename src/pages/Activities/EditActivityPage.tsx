import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useActivity } from "@/features/activities/api/tanstack/useActivity";

import { Loading, Modal } from "@/components/core";
import { EditActivityForm } from "@/features/activities/components";
import { convertSecondsToHHMMSS } from "@/utils";

export const EditActivityPage = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { data, isPending, isSuccess } = useActivity(parseInt(activityId!));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  if (!activityId) throw new Error("Activity ID is required");

  const max_time = data?.max_time ? convertSecondsToHHMMSS(data.max_time) : "";
  const avg_time = data?.avg_time ? convertSecondsToHHMMSS(data.avg_time) : "";

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      {isPending && <Loading className="mx-auto" />}
      {isSuccess && (
        <EditActivityForm
          activityId={parseInt(activityId)}
          initialValues={{
            name: data.name,
            category_id: { value: data.category.id, label: data.category.name },
            max_time,
            avg_time,
          }}
        />
      )}
    </Modal>
  );
};
