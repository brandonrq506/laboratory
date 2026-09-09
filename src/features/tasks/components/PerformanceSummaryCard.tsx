import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

import { Card } from "@/components/layout/Card";
import { getMotivationalMessage } from "@/features/tasks/utils/getMotivationalMessage";
import { getPerformanceSummary } from "@/features/tasks/utils/getPerformanceSummary";

interface SummaryItemProps {
  emoji: string;
  percent: number;
}

const SummaryItem = ({ emoji, percent }: SummaryItemProps) => (
  <span className="text-xs tabular-nums xl:text-sm">
    {emoji} {percent}%
  </span>
);

interface Props {
  tasks: CompletedTaskAPI[];
}

export const PerformanceSummaryCard = ({ tasks }: Props) => {
  const summary = getPerformanceSummary(tasks);
  const message = getMotivationalMessage(summary);

  return (
    <Card className="shadow-xs">
      <div className="flex min-h-9 flex-col justify-between xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-5">
          <SummaryItem emoji="🚀" percent={summary.rocketPct} />
          <SummaryItem emoji="🐢" percent={summary.turtlePct} />
          <SummaryItem emoji="🐌" percent={summary.snailPct} />
        </div>
        <span className="text-foreground-muted text-sm tracking-widest">
          {message}
        </span>
      </div>
    </Card>
  );
};
