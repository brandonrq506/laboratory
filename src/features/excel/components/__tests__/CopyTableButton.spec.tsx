import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { CopyTableButton } from "../CopyTableButton";
import type { ExcelTableRow } from "@/features/excel/types/excelTableRow";

describe("CopyTableButton", () => {
  it("does not render when data is empty", () => {
    render(<CopyTableButton data={[]} />);
    expect(
      screen.queryByRole("button", { name: /copy to clipboard/i }),
    ).not.toBeInTheDocument();
  });

  it("copies a sanitized, tab-separated table to clipboard", async () => {
    const user = userEvent.setup();

    const data: ExcelTableRow[] = [
      {
        activity: "Read\tDocs\n",
        category: "Work",
        start_time: "09:00",
        start_minutes: 540,
        minutes_duration: 60,
        duration: "1:00",
        percentage: 6.25,
        date: "2024-01-01",
      },
      {
        activity: "Code Review",
        category: "Dev\tOps",
        start_time: "10:00",
        start_minutes: 600,
        minutes_duration: 30,
        duration: "0:30",
        percentage: 3.125,
        date: "2024-01-01",
      },
    ];

    const writeText = vi.fn().mockResolvedValue(undefined);
    // jsdom doesn't include clipboard by default; define it
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<CopyTableButton data={data} />);

    const button = screen.getByRole("button", { name: /copy to clipboard/i });
    await user.click(button);

    const expected = [
      [
        "Read Docs ",
        "Read Docs ",
        "Work",
        "09:00",
        "1:00",
        "2024-01-01",
        "6.25",
      ].join("\t"),
      [
        "Code Review",
        "Code Review",
        "Dev Ops",
        "10:00",
        "0:30",
        "2024-01-01",
        "3.125",
      ].join("\t"),
    ].join("\n");

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(expected);
  });
});
