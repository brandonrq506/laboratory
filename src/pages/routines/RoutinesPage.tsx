import { useDeleteRoutine } from "@/features/routines/api/tanstack/useDeleteRoutine";
import { useRoutines } from "@/features/routines/api/tanstack/useRoutines";

import { Card, PageHeader, SectionHeaderWithAction } from "@/components/layout";
import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { DELETE } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";

export const RoutinesPage = () => {
  const { data, isSuccess } = useRoutines();
  const { mutate } = useDeleteRoutine();

  const deleteText = `${DELETE} ${ROUTINE}`;

  const onDeleteRoutine = (id: number) => mutate(id);

  return (
    <div>
      <PageHeader title="Routines" className="mb-2" />

      <div className="flex flex-wrap items-center gap-2">
        {isSuccess &&
          data.map((routine) => {
            return (
              <Card key={routine.id} className="w-full sm:w-1/2 lg:w-1/3">
                <SectionHeaderWithAction
                  title={routine.name}
                  className="gap-x-2"
                  action={
                    <IconButton
                      shape="circle"
                      aria-label={deleteText}
                      variant="dangerOutline"
                      onClick={() => onDeleteRoutine(routine.id)}>
                      <TrashIcon className="size-5" aria-hidden />
                    </IconButton>
                  }
                />
              </Card>
            );
          })}
      </div>
    </div>
  );
};
