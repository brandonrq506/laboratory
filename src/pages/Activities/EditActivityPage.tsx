import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useActivity } from "@/features/activities/api/tanstack/useActivity";

import { Loading, Modal } from "@/components/core";
import { EditActivityForm } from "@/features/activities/components";
import { convertSecondsToHHandMM } from "@/features/activities/utils/convertSecondsToHHandMM";

export const EditActivityPage = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { data, isPending, isError } = useActivity(parseInt(activityId!));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  if (!activityId) throw new Error("Activity ID is required");

  if (isPending) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <Loading className="mx-auto" />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate("..")}>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>Something went wrong while fetching the activity.</p>
        </div>
      </Modal>
    );
  }

  const max_time = convertSecondsToHHandMM(data.max_time!);
  const avg_time = convertSecondsToHHandMM(data.avg_time!);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("..")}>
      <EditActivityForm
        activityId={parseInt(activityId)}
        initialValues={{
          avg_time_hours: avg_time.hours,
          avg_time_minutes: avg_time.minutes,
          name: data.name,
          category_id: { value: data.category.id, label: data.category.name },
          max_time_hours: max_time.hours,
          max_time_minutes: max_time.minutes,
        }}
      />
    </Modal>
  );
};
