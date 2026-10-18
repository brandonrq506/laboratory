import { render, screen } from "@/test/test-utils";

import { MESSAGES } from "@/features/tasks/utils/getMotivationalMessage";
import { PerformanceSummaryCard } from "../PerformanceSummaryCard";
import { completedTasks } from "@/test/store/tasks";

describe("PerformanceSummaryCard", () => {
  it("renders net minutes and message with tasks", () => {
    render(<PerformanceSummaryCard tasks={completedTasks} />);

    expect(screen.getByText("+4m")).toBeInTheDocument();
    expect(screen.getByText(MESSAGES.solid)).toBeInTheDocument();
  });

  it("renders only the empty-state message with no tasks", () => {
    render(<PerformanceSummaryCard tasks={[]} />);

    expect(screen.getByText(MESSAGES.empty)).toBeInTheDocument();
    expect(screen.queryByText("0m")).not.toBeInTheDocument();
  });

  it("renders net minutes without message when disabled", () => {
    render(
      <PerformanceSummaryCard tasks={completedTasks} withMessage={false} />,
    );

    expect(screen.getByText("+4m")).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.solid)).not.toBeInTheDocument();
  });

  it("renders 0m with no tasks when message is disabled", () => {
    render(<PerformanceSummaryCard tasks={[]} withMessage={false} />);

    expect(screen.getByText("0m")).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.empty)).not.toBeInTheDocument();
  });
});
