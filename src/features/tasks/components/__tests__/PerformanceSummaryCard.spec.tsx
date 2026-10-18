import { render, screen } from "@/test/test-utils";

import {
  EMPTY_PHRASES,
  PACE_TREND_PHRASES,
} from "@/features/motivationalMessage/constants/phrases";
import { DAY_PHASE } from "@/features/motivationalMessage/types/day-phase";
import { PACE_TREND } from "@/features/motivationalMessage/types/pace-trend";
import { PerformanceSummaryCard } from "../PerformanceSummaryCard";
import { completedTasks } from "@/test/store/tasks";

const MORNING = new Date("2026-10-18T09:00:00");
const [EMPTY_MORNING] = EMPTY_PHRASES[DAY_PHASE.MORNING];
/** The fixture's last 3 tasks run slower than its first: Slowing Down. */
const SLOWING_DOWN = PACE_TREND_PHRASES[PACE_TREND.SLOWING_DOWN];
const SLOWING_DOWN_TEXT = new RegExp(`^(${SLOWING_DOWN.join("|")})$`);

describe("PerformanceSummaryCard", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(MORNING);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders net minutes and today's message with tasks", () => {
    render(<PerformanceSummaryCard tasks={completedTasks} />);

    expect(screen.getByText("+4m")).toBeInTheDocument();
    expect(screen.getByText(SLOWING_DOWN_TEXT)).toBeInTheDocument();
  });

  it("renders only the empty-state message with no tasks", () => {
    render(<PerformanceSummaryCard tasks={[]} />);

    expect(screen.getByText(EMPTY_MORNING)).toBeInTheDocument();
    expect(screen.queryByText("0m")).not.toBeInTheDocument();
  });

  it("renders net minutes without message when disabled", () => {
    render(
      <PerformanceSummaryCard tasks={completedTasks} withMessage={false} />,
    );

    expect(screen.getByText("+4m")).toBeInTheDocument();
    expect(screen.queryByText(SLOWING_DOWN_TEXT)).not.toBeInTheDocument();
  });

  it("renders 0m with no tasks when message is disabled", () => {
    render(<PerformanceSummaryCard tasks={[]} withMessage={false} />);

    expect(screen.getByText("0m")).toBeInTheDocument();
    expect(screen.queryByText(EMPTY_MORNING)).not.toBeInTheDocument();
  });
});
