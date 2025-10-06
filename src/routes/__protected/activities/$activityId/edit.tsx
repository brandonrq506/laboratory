import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditActivityForm } from "@/features/activities/components";
import { Modal } from "@/components/core";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";
import { convertSecondsToHHandMM } from "@/features/activities/utils/convertSecondsToHHandMM";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/activities/$activityId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { activityId } = Route.useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/activities" });
  const { data } = useSuspenseQuery(activityByIdQueryOptions(activityId));

  useEffect(() => setIsOpen(true), []);

  const max_time = convertSecondsToHHandMM(data.max_seconds!);
  const expected_time = convertSecondsToHHandMM(data.exp_seconds!);

  return (
    <Modal isOpen={isOpen} onClose={() => navigateBack()}>
      <EditActivityForm
        activityId={parseInt(activityId)}
        initialValues={{
          exp_time_hours: expected_time.hours,
          exp_time_minutes: expected_time.minutes,
          name: data.name,
          display_name: data.display_name,
          category_id: { value: data.category.id, label: data.category.name },
          max_time_hours: max_time.hours,
          max_time_minutes: max_time.minutes,
        }}
      />
    </Modal>
  );
}
