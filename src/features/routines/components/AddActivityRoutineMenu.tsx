import { useCreateActivityRoutine } from "../api/tanstack/useCreateActivityRoutine";
import { useQuery } from "@tanstack/react-query";

import { FloatingMenu, Loading } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { MenuItem } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { ACTIVITIES } from "@/constants/entities";
import { ADD } from "@/constants/actions";
import { activityListQueryOptions } from "@/features/activities/api/queries";

interface Props {
  routineId: number;
}

export const AddActivityRoutineMenu = ({ routineId }: Props) => {
  const { data, isPending, isError } = useQuery(activityListQueryOptions());
  const { mutate } = useCreateActivityRoutine();

  if (isPending)
    return (
      <FloatingMenu
        srBtnText={`${ADD} ${ACTIVITIES}`}
        iconBtn={<Loading sizeStyles="size-5" />}>
        <MenuItem>
          <div className="py-10">
            <Loading />
          </div>
        </MenuItem>
      </FloatingMenu>
    );

  if (isError) return <div>Error loading activities</div>;

  return (
    <FloatingMenu
      srBtnText={`${ADD} ${ACTIVITIES}`}
      iconBtn={<PlusIcon className="size-5" aria-hidden />}>
      {data.map((activity) => (
        <MenuItem key={activity.id}>
          <button
            className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              mutate({ activityId: activity.id, routineId });
            }}>
            {activity.display_name}{" "}
            <CategoryBadge category={activity.category} />
          </button>
        </MenuItem>
      ))}
    </FloatingMenu>
  );
};
