import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";
import { useCreateScheduledTask } from "@/features/tasks/api/tanstack/useCreateScheduledTask";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Badge, FloatingMenu, Loading } from "@/components/core";
import { MenuHeading, MenuItem, MenuSection } from "@headlessui/react";
import { CategoryBadge } from "@/features/categories/components";
import { PlusIcon } from "@heroicons/react/24/solid";
import { activityListQueryOptions } from "@/features/activities/api/queries";
import { routineListQueryOptions } from "@/features/routines/api/queries";

import { ADD } from "@/constants/actions";
import { TASKS } from "@/constants/entities";
import clsx from "clsx";

export const AddScheduledTaskMenu = () => {
  const { data: activities } = useQuery(activityListQueryOptions());
  const { data: routines } = useQuery(routineListQueryOptions());

  const { mutate: mutateTask } = useCreateScheduledTask();
  const { mutate: applyRoutine } = useApplyRoutine();

  const [pendingRoutineId, setPendingRoutineId] = useState<number | null>(null);

  const handleApplyRoutine = (routineId: number) => {
    setPendingRoutineId(routineId);
    applyRoutine(routineId, {
      onSettled: () => setPendingRoutineId(null),
    });
  };

  const nonEmptyRoutines = routines?.filter((r) => r.activities.length > 0);

  const hasRoutines = nonEmptyRoutines && nonEmptyRoutines.length > 0;

  return (
    <FloatingMenu
      srBtnText={`${ADD} ${TASKS}`}
      iconBtn={<PlusIcon className="size-5" aria-hidden />}>
      {hasRoutines && (
        <MenuSection>
          <MenuHeading className="bg-gray-100 px-2 py-1.5 text-sm opacity-50">
            Routines
          </MenuHeading>
          {nonEmptyRoutines?.map((routine) => (
            <MenuItem key={routine.id}>
              <button
                className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleApplyRoutine(routine.id);
                }}>
                <div className="flex items-center gap-2">
                  {routine.name}
                  {pendingRoutineId === routine.id && <Loading />}
                </div>
                <Badge color="white">Routine</Badge>
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
              {activity.display_name}{" "}
              <CategoryBadge category={activity.category} />
            </button>
          </MenuItem>
        ))}
      </MenuSection>
    </FloatingMenu>
  );
};
