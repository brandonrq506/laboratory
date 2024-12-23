import { render, screen } from "@testing-library/react";
import { ControllerTwo } from "./ControllerTwo";
import userEvent from "@testing-library/user-event";

describe("ControllerTwo", () => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  it("shows error messages when submit empty", async () => {
    const favFoodMessage = "I NEED to know your favorite food";
    const favPlanetMessage = "Are you annoyed that Uranus is not an option?";

    const user = userEvent.setup();
    render(<ControllerTwo />);

    await user.click(screen.getByText("Submit"));

    expect(screen.getByText(favFoodMessage)).toBeInTheDocument();
    expect(screen.getByText(favPlanetMessage)).toBeInTheDocument();
  });
});
