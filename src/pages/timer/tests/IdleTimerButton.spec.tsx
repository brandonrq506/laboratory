import { render, screen } from "@testing-library/react";

import { IdleTimerButton } from "../IdleTimerButton";

describe("IdleTimerButton", () => {
  it("shows 'No Network' icon when offline", () => {
    render(
      <IdleTimerButton isOnline={false} isPending={false} isError={false} />,
    );

    const button = screen.getByRole("button", { name: /no network button/i });

    expect(button).toBeInTheDocument();
  });

  it("shows 'Loading' icon when pending", () => {
    render(
      <IdleTimerButton isOnline={true} isPending={true} isError={false} />,
    );

    const button = screen.getByRole("button", { name: /loading/i });

    expect(button).toBeInTheDocument();
  });

  it("shows 'Retry' icon when error", () => {
    render(
      <IdleTimerButton isOnline={true} isPending={false} isError={true} />,
    );

    const button = screen.getByRole("button", { name: /retry button/i });

    expect(button).toBeInTheDocument();
  });

  it("shows 'Start' icon when idle", () => {
    render(
      <IdleTimerButton isOnline={true} isPending={false} isError={false} />,
    );

    const button = screen.getByRole("button", { name: /start button/i });

    expect(button).toBeInTheDocument();
  });
});
