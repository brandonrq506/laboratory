import { useSearchParams } from "react-router-dom";
import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { Button } from "@/components/core";
import { TaskList } from "@/features/tasks/components";

export const FilterableTaskList = () => {
  const [params] = useSearchParams();
  const categoryParam = params.get("category_id");
  const category_id = categoryParam ? parseInt(categoryParam) : undefined;

  const { data, isPending, isError, refetch } = useTasks({
    category_id,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <Button onClick={() => refetch()}>Try again</Button>;

  return <TaskList tasks={data} />;
};
