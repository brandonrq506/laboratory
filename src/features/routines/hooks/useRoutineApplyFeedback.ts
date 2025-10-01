import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";
import { useState } from "react";
import { useTimeout } from "@/hooks/useTimeout";

export type RoutineFeedbackStatus = "success" | "error";

export interface RoutineFeedbackState {
  routineId: number;
  status: RoutineFeedbackStatus;
}

const FEEDBACK_DURATION_MS = 2000;

export const useRoutineApplyFeedback = () => {
  const { mutate: mutateApplyRoutine } = useApplyRoutine();

  const [pendingRoutineId, setPendingRoutineId] = useState<number | null>(null);
  const [routineFeedback, setRoutineFeedback] =
    useState<RoutineFeedbackState | null>(null);

  const { start: scheduleFeedbackReset } = useTimeout(() =>
    setRoutineFeedback(null),
  );

  const applyRoutineWithFeedback = (routineId: number) => {
    setPendingRoutineId(routineId);

    mutateApplyRoutine(routineId, {
      onSuccess: (_, variables) => {
        setRoutineFeedback({ routineId: variables, status: "success" });
        scheduleFeedbackReset(FEEDBACK_DURATION_MS);
      },
      onError: (_, variables) => {
        setRoutineFeedback({ routineId: variables, status: "error" });
        scheduleFeedbackReset(FEEDBACK_DURATION_MS);
      },
      onSettled: () => {
        setPendingRoutineId(null);
      },
    });
  };

  return {
    applyRoutine: applyRoutineWithFeedback,
    pendingRoutineId,
    routineFeedback,
  };
};
