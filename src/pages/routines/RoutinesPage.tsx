import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { PageHeader } from "@/components/layout";

export const RoutinesPage = () => {
  const { data, isSuccess } = useRoutines();

  return (
    <div>
      <PageHeader title="Routines" />

      <div className="flex flex-wrap items-center gap-2">
        {isSuccess &&
          data.map((routine) => {
            return (
              <div key={routine.id} className="rounded border p-4">
                <h3>{routine.name}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};
