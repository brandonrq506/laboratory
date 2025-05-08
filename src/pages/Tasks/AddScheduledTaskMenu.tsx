import { useActivities } from "@/features/activities/api/tanstack/useActivities";
import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";
import { useCreateScheduledTask } from "@/features/tasks/api/tanstack/useCreateScheduledTask";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { Badge, FloatingMenu } from "@/components/core";
import { MenuHeading, MenuItem, MenuSection } from "@headlessui/react";
import { CategoryBadge } from "@/features/categories/components";
import { PlusIcon } from "@heroicons/react/24/solid";

import { ADD } from "@/constants/actions";
import { TASKS } from "@/constants/entities";
import clsx from "clsx";

// Todo: Maybe it is better to have a <MenuItem> custom component (think of better name)
export const AddScheduledTaskMenu = () => {
  const { data: activities } = useActivities();
  const { data: routines } = useRoutines();

  const { mutate: mutateTask } = useCreateScheduledTask();
  const { mutate: applyRoutine } = useApplyRoutine();

  const hasRoutines = routines && routines.length > 0;

  return (
    <FloatingMenu
      srBtnText={`${ADD} ${TASKS}`}
      iconBtn={<PlusIcon className="size-5" aria-hidden />}>
      {hasRoutines && (
        <MenuSection>
          <MenuHeading className="bg-gray-100 px-2 py-1.5 text-sm opacity-50">
            Routines
          </MenuHeading>
          {routines?.map((routine) => (
            <MenuItem key={routine.id}>
              <button
                className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  applyRoutine(routine.id);
                }}>
                {routine.name} <Badge color="white">Routine</Badge>
              </button>
            </MenuItem>
          ))}
        </MenuSection>
      )}

      <MenuSection>
        <MenuHeading
          className={clsx(
            "bg-gray-100 px-2 py-1.5 text-sm opacity-50",
            !hasRoutines && "hidden",
          )}>
          Activities
        </MenuHeading>

        {activities?.map((activity) => (
          <MenuItem key={activity.id}>
            <button
              className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                mutateTask(activity);
              }}>
              {activity.name} <CategoryBadge category={activity.category} />
            </button>
          </MenuItem>
        ))}
      </MenuSection>
    </FloatingMenu>
  );
};
