import { render, screen } from "@/test/test-utils";

import { MESSAGES } from "@/features/tasks/utils/getMotivationalMessage";
import { PerformanceSummaryCard } from "../PerformanceSummaryCard";
import { completedTasks } from "@/test/store/tasks";

describe("PerformanceSummaryCard", () => {
  it("renders all 3 emojis with tasks", () => {
    render(<PerformanceSummaryCard tasks={completedTasks} />);

    expect(screen.getByText(/🚀/)).toBeInTheDocument();
    expect(screen.getByText(/🐢/)).toBeInTheDocument();
    expect(screen.getByText(/🐌/)).toBeInTheDocument();
  });

  it("renders empty-state message with no tasks", () => {
    render(<PerformanceSummaryCard tasks={[]} />);

    expect(screen.getByText(MESSAGES.empty)).toBeInTheDocument();
  });
});
