import { useCreateScheduledTask } from "../api/tanstack/useCreateScheduledTask";
import { useQuery } from "@tanstack/react-query";

import { FloatingMenu, Loading } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { MenuItem } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { ADD } from "@/constants/actions";
import { TASKS } from "@/constants/entities";
import { activityListQueryOptions } from "@/features/activities/api/queryKeys";

export const QuickCreateTaskMenu = () => {
  const { data, isPending, isError } = useQuery(activityListQueryOptions());
  const { mutate } = useCreateScheduledTask();

  if (isPending)
    return (
      <FloatingMenu
        srBtnText={`${ADD} ${TASKS}`}
        iconBtn={<Loading sizeStyles="size-5" />}>
        <MenuItem>
          <div className="py-10">
            <Loading />
          </div>
        </MenuItem>
      </FloatingMenu>
    );

  if (isError) return <div>Error</div>;

  return (
    <FloatingMenu
      srBtnText={`${ADD} ${TASKS}`}
      iconBtn={<PlusIcon className="size-5" aria-hidden />}>
      {data.map((activity) => (
        <MenuItem key={activity.id}>
          <button
            className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              mutate(activity);
            }}>
            {activity.display_name}{" "}
            <CategoryBadge category={activity.category} />
          </button>
        </MenuItem>
      ))}
    </FloatingMenu>
  );
};
