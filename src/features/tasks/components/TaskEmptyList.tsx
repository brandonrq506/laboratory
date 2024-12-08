import { ListBulletIcon } from "@heroicons/react/24/outline";

export const TaskEmptyList = () => {
  return (
    <div className="rounded-md p-6 text-center font-light">
      <ListBulletIcon
        aria-hidden
        className="mx-auto size-12 stroke-1 text-gray-400"
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Tasks</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new task.
      </p>
    </div>
  );
};
