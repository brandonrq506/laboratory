import { usePrefetchRoutine } from "@/features/routines/api/tanstack/usePrefetchRoutine";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { Link, Outlet } from "react-router";
import { LinkButton } from "@/components/core";
import { PageHeaderWithActions } from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/outline";

import { ADD } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";
import { RoutineCard } from "@/features/routines/components";

export const RoutinesPage = () => {
  const prefetchRoutine = usePrefetchRoutine();
  const { data, isSuccess } = useRoutines();

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
              <Link
                key={routine.id}
                to={`edit/${routine.id}`}
                onFocus={() => prefetchRoutine(routine.id)}
                onMouseEnter={() => prefetchRoutine(routine.id)}
                className="max-h-56 w-full xl:max-w-md">
                <RoutineCard routine={routine} />
              </Link>
            );
          })}
      </div>
      <Outlet />
    </div>
  );
};
