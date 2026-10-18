import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { Card } from "@/components/layout/Card";
import { PerformanceDelta } from "./PerformanceDelta";
import { getMotivationalMessage } from "@/features/tasks/utils/getMotivationalMessage";
import { getPerformanceSummary } from "@/features/tasks/utils/getPerformanceSummary";

interface Props {
  tasks: CompletedTaskAPI[];
  withMessage?: boolean;
}

export const PerformanceSummaryCard = ({
  tasks,
  withMessage = true,
}: Props) => {
  const summary = getPerformanceSummary(tasks);
  // With a message, an empty day only shows the "start" prompt.
  const showDelta = !withMessage || summary.total > 0;

  return (
    <Card className="shadow-xs">
      <div className="flex min-h-9 items-center justify-between gap-2">
        {showDelta && (
          <PerformanceDelta
            minutes={summary.netMinutes}
            tier={summary.tier}
            className="text-sm font-semibold xl:text-base"
          />
        )}
        {withMessage && (
          <span className="text-foreground-muted text-sm tracking-widest">
            {getMotivationalMessage(summary)}
          </span>
        )}
      </div>
    </Card>
  );
};
