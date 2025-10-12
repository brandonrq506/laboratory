import { render, screen } from "@/test/test-utils";
import { AuthProvider } from "../../stores";
import { LoginForm } from "../LoginForm";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  it("focuses on the 'Email' input by default", () => {
    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    expect(screen.getByLabelText("Email")).toHaveFocus();
  });

  it("requires necessary values before submitting", async () => {
    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    await userEvent.type(screen.getByLabelText("Email"), "test");
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Email must contain @")).toBeInTheDocument();
  });
});
