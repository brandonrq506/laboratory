import { Link, useSearchParams } from "react-router";

import { PlusIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

export const AddTaskButton = () => {
  const [params] = useSearchParams();
  const dateParam = params.get("date");

  const date = dateParam ? dateParam : format(new Date(), "yyyy-MM-dd");

  return (
    <Link to={`new/?date=${date}`}>
      <span className="sr-only">Add Task</span>
      <PlusIcon className="size-5 text-blue-600" aria-hidden />
    </Link>
  );
};
