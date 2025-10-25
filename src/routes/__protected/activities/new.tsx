import { useNavigateBack } from "@/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import { CreateActivityForm } from "@/features/activities/components";
import { Modal } from "@/components/core";
import { categoryListQueryOptions } from "@/features/categories/api/queries";
import { createFileRoute } from "@tanstack/react-router";
import { getFirstCategoryAsOption } from "@/features/categories/utils";

export const Route = createFileRoute("/__protected/activities/new")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(categoryListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(categoryListQueryOptions());
  const navigateBack = useNavigateBack({ fallback: "/activities" });

  const defaultCategory = getFirstCategoryAsOption(data);

  return (
    <div>
      <Modal isOpen={true} onClose={navigateBack}>
        <CreateActivityForm
          initialValues={{
            exp_time_minutes: 30,
            category_id: defaultCategory,
            max_time_hours: 1,
          }}
        />
      </Modal>
    </div>
  );
}
