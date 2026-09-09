import { ListBulletIcon } from "@heroicons/react/24/outline";

export const TaskEmptyList = () => {
  return (
    <div className="rounded-md p-6 text-center font-light">
      <ListBulletIcon
        aria-hidden
        className="text-foreground-faint mx-auto size-12 stroke-1"
      />
      <h3 className="text-foreground mt-2 text-sm font-semibold">No Tasks</h3>
      <p className="text-foreground-subtle mt-1 text-sm">
        Get started by creating a new task.
      </p>
    </div>
  );
};
