import { render, screen } from "@/test/test-utils";
import { MINUS_SIGN } from "../../constants/performance";
import { PERFORMANCE_TIER } from "../../types/performance-tier";
import { PerformanceDelta } from "../PerformanceDelta";

describe("PerformanceDelta", () => {
  it("shows minutes ahead in green with screen reader text", () => {
    render(<PerformanceDelta minutes={5} tier={PERFORMANCE_TIER.AHEAD} />);

    expect(screen.getByText("+5m")).toHaveAttribute("aria-hidden");
    expect(screen.getByText("5 minutes ahead")).toHaveClass("sr-only");
    expect(screen.getByText("+5m").parentElement).toHaveClass(
      "text-success-text",
    );
  });

  it("shows late minutes in amber", () => {
    render(<PerformanceDelta minutes={-10} tier={PERFORMANCE_TIER.LATE} />);

    expect(screen.getByText(`${MINUS_SIGN}10m`).parentElement).toHaveClass(
      "text-warning-text",
    );
  });

  it("shows minutes over max in red", () => {
    render(<PerformanceDelta minutes={-90} tier={PERFORMANCE_TIER.OVER} />);

    expect(screen.getByText(`${MINUS_SIGN}90m`).parentElement).toHaveClass(
      "text-danger-text",
    );
  });

  it("shows on time in gray without sign", () => {
    render(<PerformanceDelta minutes={0} tier={PERFORMANCE_TIER.ON_TIME} />);

    expect(screen.getByText("0m").parentElement).toHaveClass(
      "text-foreground-muted",
    );
    expect(screen.getByText("On time")).toBeInTheDocument();
  });
});
