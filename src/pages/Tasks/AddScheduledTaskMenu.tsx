import { useActivities } from "@/features/activities/api/tanstack/useActivities";
import { useCreateScheduledTask } from "@/features/tasks/api/tanstack/useCreateScheduledTask";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { MenuHeading, MenuItem, MenuSection } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { CategoryBadge } from "@/features/categories/components";

import { ADD } from "@/constants/actions";
import { TASKS } from "@/constants/entities";

import { FloatingMenu } from "@/components/core";
import clsx from "clsx";

import { RoutineMenuItem } from "./RoutineMenuItem";

export const AddScheduledTaskMenu = () => {
  const { data: activities } = useActivities();
  const { data: routines } = useRoutines();

  const { mutate: mutateTask } = useCreateScheduledTask();

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
            <RoutineMenuItem key={routine.id} routine={routine} />
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
              {activity.display_name}{" "}
              <CategoryBadge category={activity.category} />
            </button>
          </MenuItem>
        ))}
      </MenuSection>
    </FloatingMenu>
  );
};
