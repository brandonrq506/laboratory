import { render, screen } from "@/test/test-utils";
import { Timer } from "../Timer";

vi.useFakeTimers();

describe("Timer", () => {
  it("shows negative style when past expected end", () => {
    // started 10s ago
    const startPast = new Date(Date.now() - 10_000).toISOString();
    // expired 5s ago
    render(<Timer start_time={startPast} exp_seconds={5} />);

    const el = screen.getByText(/-00:00:04/);
    expect(el).toHaveClass("text-red-800");
  });
});
