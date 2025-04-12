import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";
import { useDeleteRoutine } from "@/features/routines/api/tanstack/useDeleteRoutine";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import {
  Card,
  PageHeaderWithActions,
  SectionHeaderWithAction,
} from "@/components/layout";
import { IconButton, LinkButton } from "@/components/core";
import { Link, Outlet } from "react-router";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";

import { ADD, DELETE } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";

import { convertSecondsToTime } from "@/utils";

export const RoutinesPage = () => {
  const { data, isSuccess } = useRoutines();
  const { mutate: deleteMutate } = useDeleteRoutine();
  const { mutate: applyMutate } = useApplyRoutine();

  const deleteText = `${DELETE} ${ROUTINE}`;

  const onDeleteRoutine = (id: number) => deleteMutate(id);

  const onApplyRoutine = (id: number) => applyMutate(id);

  const totalAvgTime = (activities: { avg_time: number }[]) => {
    return activities.reduce((total, activity) => {
      return total + activity.avg_time;
    }, 0);
  };

  return (
    <div>
      <PageHeaderWithActions
        title="Routines"
        className="mb-2"
        actions={
          <LinkButton
            to="new"
            size="lg"
            startIcon={<PlusIcon className="size-5" aria-hidden />}>
            {`${ADD} ${ROUTINE}`}
          </LinkButton>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        {isSuccess &&
          data.map((routine) => {
            return (
              <Card key={routine.id} className="w-full sm:w-1/2 lg:w-1/3">
                <SectionHeaderWithAction
                  title={`${routine.name} ${convertSecondsToTime(totalAvgTime(routine.activities))}`}
                  className="gap-x-2"
                  action={
                    <div>
                      <IconButton
                        shape="circle"
                        aria-label={deleteText}
                        variant="dangerOutline"
                        onClick={() => onDeleteRoutine(routine.id)}>
                        <TrashIcon className="size-5" aria-hidden />
                      </IconButton>
                      <IconButton
                        shape="circle"
                        aria-label={deleteText}
                        variant="primaryOutline"
                        onClick={() => onApplyRoutine(routine.id)}>
                        <PlayIcon className="size-5" aria-hidden />
                      </IconButton>
                    </div>
                  }
                />

                <Link to={`edit/${routine.id}`}>
                  {routine.activities.map((activity) => (
                    <div key={activity.id} className="flex justify-between">
                      <div className="flex items-center gap-x-2">
                        <span className="text-sm font-medium">
                          {activity.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {activity.category_name}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs">
                          {convertSecondsToTime(activity.avg_time)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {routine.activities.length === 0 && (
                    <div className="flex h-20 items-center justify-center">
                      <span className="text-sm text-gray-500">
                        No activities
                      </span>
                    </div>
                  )}
                </Link>
              </Card>
            );
          })}
      </div>
      <Outlet />
    </div>
  );
};
