import { useEffect, useState } from "react";
import { useNavigateBack } from "@/hooks";

import {
  AddActivityRoutineMenu,
  RoutineActivityList,
  RoutineNameForm,
} from "@/features/routines/components";
import { HeadingMedium, SectionHeaderWithAction } from "@/components/layout";
import { EditRoutineActions } from "@/pages/routines/EditRoutinePage/EditRoutineActions";
import { FullHeightModal } from "@/components/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/$routineId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { routineId } = Route.useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigateBack = useNavigateBack({ fallback: "/routines" });

  useEffect(() => setIsOpen(true), []);

  return (
    <FullHeightModal
      isOpen={isOpen}
      onClose={navigateBack}
      className="flex max-h-[calc(100dvh-2rem)] min-h-0 flex-col overflow-visible sm:max-h-[calc(100dvh-4rem)]">
      <div className="flex flex-1 min-h-0 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <HeadingMedium
            title="Edit Routine"
            description="Customize your routine by updating the name and managing activities"
          />
          <RoutineNameForm />
          <SectionHeaderWithAction
            title="Activities"
            action={<AddActivityRoutineMenu routineId={routineId} />}
          />
        </div>
        <div className="flex flex-1 min-h-0 flex-col gap-6">
          <div className="flex-1 overflow-y-auto px-3 [scrollbar-gutter:stable]">
            <RoutineActivityList />
          </div>
          <EditRoutineActions />
        </div>
      </div>
    </FullHeightModal>
  );
}
