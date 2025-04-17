import { usePrefetchRoutine } from "@/features/routines/api/tanstack/usePrefetchRoutine";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { Badge, LinkButton } from "@/components/core";
import {
  Card,
  PageHeaderWithActions,
  SectionHeaderWithAction,
} from "@/components/layout";
import { Link, Outlet } from "react-router";

import { PlusIcon } from "@heroicons/react/24/outline";

import { ADD } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";

import { convertSecondsToTime } from "@/utils";

const MAX_VISIBLE_ACTIVITIES = 5;

export const RoutinesPage = () => {
  const prefetchRoutine = usePrefetchRoutine();
  const { data, isSuccess } = useRoutines();

  const totalAvgTime = (activities: { activity_avg_time: number }[]) => {
    return activities.reduce((total, activity) => {
      return total + activity.activity_avg_time;
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

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {isSuccess &&
          data.map((routine) => {
            return (
              <Card
                key={routine.id}
                className="relative max-h-56 w-full overflow-hidden xl:max-w-md">
                <Link
                  to={`edit/${routine.id}`}
                  onFocus={() => prefetchRoutine(routine.id)}
                  onMouseEnter={() => prefetchRoutine(routine.id)}>
                  <SectionHeaderWithAction
                    title={routine.name}
                    className="gap-x-2"
                    action={
                      <div className="text-sm tabular-nums">
                        {convertSecondsToTime(totalAvgTime(routine.activities))}
                      </div>
                    }
                  />

                  {routine.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="my-1 flex justify-between">
                      <div className="flex items-center gap-x-2">
                        <Badge color={activity.category_color}>
                          {activity.activity_name}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {activity.category_name}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs">
                          {convertSecondsToTime(activity.activity_avg_time)}
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
                {routine.activities.length > MAX_VISIBLE_ACTIVITIES && (
                  <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-white to-transparent" />
                )}
              </Card>
            );
          })}
      </div>
      <Outlet />
    </div>
  );
};
