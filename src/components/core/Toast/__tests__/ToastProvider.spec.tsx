import { render, screen } from "@/test/test-utils";
import { render as renderWithoutWrapper } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "../ToastProvider";

// Test component that uses the useToast hook
const TestComponent = () => {
  const { showToast, hideToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast("error", "Test Error", "Test message")}>
        Show Error Toast
      </button>
      <button onClick={() => showToast("success", "Test Success")}>
        Show Success Toast
      </button>
      <button onClick={() => hideToast("test-id")}>
        Hide Toast
      </button>
    </div>
  );
};

describe("ToastProvider", () => {
  it("throws error when useToast is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // We need to render the component without the ToastProvider wrapper
    // that's provided by our test utils
    expect(() => 
      renderWithoutWrapper(<TestComponent />)
    ).toThrow("useToast must be used within a ToastProvider");

    consoleSpy.mockRestore();
  });

  it("shows error toast when showToast is called", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const showErrorButton = screen.getByText("Show Error Toast");
    await user.click(showErrorButton);

    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("shows success toast without message", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const showSuccessButton = screen.getByText("Show Success Toast");
    await user.click(showSuccessButton);

    expect(screen.getByText("Test Success")).toBeInTheDocument();
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("hides toast when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const showErrorButton = screen.getByText("Show Error Toast");
    await user.click(showErrorButton);

    expect(screen.getByText("Test Error")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByText("Test Error")).not.toBeInTheDocument();
  });

  it("shows multiple toasts at the same time", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const showErrorButton = screen.getByText("Show Error Toast");
    const showSuccessButton = screen.getByText("Show Success Toast");

    await user.click(showErrorButton);
    await user.click(showSuccessButton);

    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.getByText("Test Success")).toBeInTheDocument();
  });
});