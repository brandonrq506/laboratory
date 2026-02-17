import { useCreateRoutineItem } from "../api/tanstack/use-create-routine-item";
import { useQuery } from "@tanstack/react-query";

import {
  FloatingMenu,
  Loading,
  QueryStatusIndicator,
  RainbowBadge,
} from "@/components/core";
import { MenuItem, MenuSection } from "@headlessui/react";
import { CategoryBadge } from "@/features/categories/components";
import { PlusIcon } from "@heroicons/react/24/solid";

import { ADD } from "@/constants/actions";
import { ITEMS } from "@/constants/entities";
import { activityListQueryOptions } from "@/features/activities/api/queries";
import { routineNestableCandidateListQueryOptions } from "../api/queries";

interface Props {
  routineId: number;
}

export const AddRoutineItemMenu = ({ routineId }: Props) => {
  const {
    data: activities,
    isPending: isPendingActivities,
    isError: isErrorActivities,
  } = useQuery(activityListQueryOptions());
  const {
    data: routines,
    isPending: isPendingRoutines,
    isError: isErrorRoutines,
  } = useQuery(routineNestableCandidateListQueryOptions(routineId));
  const { mutate, status, reset } = useCreateRoutineItem();

  if (isPendingActivities || isPendingRoutines)
    return (
      <FloatingMenu
        srBtnText={`${ADD} ${ITEMS}`}
        iconBtn={<Loading sizeStyles="size-5" />}>
        <MenuItem>
          <div className="py-10">
            <Loading />
          </div>
        </MenuItem>
      </FloatingMenu>
    );

  if (isErrorActivities || isErrorRoutines)
    return <div>Error loading items</div>;

  return (
    <FloatingMenu
      srBtnText={`${ADD} ${ITEMS}`}
      iconBtn={<PlusIcon className="size-5" aria-hidden />}>
      <MenuSection>
        <MenuItem disabled>
          <div className="flex w-full items-center justify-between gap-2 px-2 py-2 text-sm font-light data-focus:bg-gray-100">
            Options
            <QueryStatusIndicator status={status} reset={reset} />
          </div>
        </MenuItem>
      </MenuSection>
      {routines.map((routine) => (
        <MenuItem key={routine.id}>
          <button
            className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              mutate({ nestedRoutineId: routine.id, routineId });
            }}>
            {routine.name}
            <RainbowBadge>Routine</RainbowBadge>
          </button>
        </MenuItem>
      ))}

      {activities.map((activity) => (
        <MenuItem key={activity.id}>
          <button
            className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              mutate({ activityId: activity.id, routineId });
            }}>
            {activity.display_name}
            <CategoryBadge category={activity.category} />
          </button>
        </MenuItem>
      ))}
    </FloatingMenu>
  );
};
