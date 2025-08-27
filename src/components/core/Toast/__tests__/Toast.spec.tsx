import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Toast, ToastProps } from "../Toast";

const defaultProps: ToastProps = {
  id: "test-toast",
  type: "error",
  title: "Test Error",
  message: "This is a test error message",
  onClose: vi.fn(),
};

describe("Toast", () => {
  it("renders toast with title and message", () => {
    render(<Toast {...defaultProps} />);

    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.getByText("This is a test error message")).toBeInTheDocument();
  });

  it("renders toast without message when not provided", () => {
    const propsWithoutMessage = { ...defaultProps, message: undefined };
    render(<Toast {...propsWithoutMessage} />);

    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.queryByText("This is a test error message")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    const props = { ...defaultProps, onClose: onCloseMock };

    render(<Toast {...props} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledWith("test-toast");
  });

  it("applies correct styling for error type", () => {
    render(<Toast {...defaultProps} type="error" />);

    const toast = screen.getByRole("alert");
    expect(toast).toHaveClass("bg-red-50", "border-red-200", "text-red-800");
  });

  it("applies correct styling for success type", () => {
    render(<Toast {...defaultProps} type="success" />);

    const toast = screen.getByRole("alert");
    expect(toast).toHaveClass("bg-green-50", "border-green-200", "text-green-800");
  });

  it("applies correct styling for warning type", () => {
    render(<Toast {...defaultProps} type="warning" />);

    const toast = screen.getByRole("alert");
    expect(toast).toHaveClass("bg-yellow-50", "border-yellow-200", "text-yellow-800");
  });

  it("applies correct styling for info type", () => {
    render(<Toast {...defaultProps} type="info" />);

    const toast = screen.getByRole("alert");
    expect(toast).toHaveClass("bg-blue-50", "border-blue-200", "text-blue-800");
  });
});