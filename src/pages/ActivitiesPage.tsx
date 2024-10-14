import { useQueryClient } from "@tanstack/react-query";

import { ActivityList } from "@/features/activities/components/ActivityList";
import { Button } from "@/components/core";

export const ActivitiesPage = () => {
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Activities Page</h1>
      <Button
        variant="danger"
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ["/activities"],
          })
        }>
        Invalidate Query
      </Button>

      <ActivityList />
    </div>
  );
};
