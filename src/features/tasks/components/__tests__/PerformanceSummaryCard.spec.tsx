import { render, screen } from "@/test/test-utils";

import {
  EMPTY_PHRASES,
  NET_BAND_PHRASES,
} from "@/features/motivationalMessage/constants/phrases";
import { DAY_PHASE } from "@/features/motivationalMessage/types/day-phase";
import { NET_BAND } from "@/features/motivationalMessage/types/net-band";
import { PerformanceSummaryCard } from "../PerformanceSummaryCard";
import { makeCompletedDay } from "@/test/utils/make-completed-task";

const MORNING = new Date("2026-10-18T09:00:00");
const [EMPTY_MORNING] = EMPTY_PHRASES[DAY_PHASE.MORNING];
/** 4 tasks netting +5m with no Pace Trend: a Steady morning. */
const TASKS = makeCompletedDay([2, 1, 1, 1]);
const STEADY_MORNING = NET_BAND_PHRASES[NET_BAND.STEADY][DAY_PHASE.MORNING];
const STEADY_MORNING_TEXT = new RegExp(`^(${STEADY_MORNING.join("|")})$`);

describe("PerformanceSummaryCard", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(MORNING);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders net minutes and today's message with tasks", () => {
    render(<PerformanceSummaryCard tasks={TASKS} />);

    expect(screen.getByText("+5m")).toBeInTheDocument();
    expect(screen.getByText(STEADY_MORNING_TEXT)).toBeInTheDocument();
  });

  it("renders only the empty-state message with no tasks", () => {
    render(<PerformanceSummaryCard tasks={[]} />);

    expect(screen.getByText(EMPTY_MORNING)).toBeInTheDocument();
    expect(screen.queryByText("0m")).not.toBeInTheDocument();
  });

  it("renders net minutes without message when disabled", () => {
    render(<PerformanceSummaryCard tasks={TASKS} withMessage={false} />);

    expect(screen.getByText("+5m")).toBeInTheDocument();
    expect(screen.queryByText(STEADY_MORNING_TEXT)).not.toBeInTheDocument();
  });

  it("renders 0m with no tasks when message is disabled", () => {
    render(<PerformanceSummaryCard tasks={[]} withMessage={false} />);

    expect(screen.getByText("0m")).toBeInTheDocument();
    expect(screen.queryByText(EMPTY_MORNING)).not.toBeInTheDocument();
  });
});
