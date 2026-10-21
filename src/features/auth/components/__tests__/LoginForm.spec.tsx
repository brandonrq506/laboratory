import { HttpResponse, http } from "msw";
import { render, screen, waitFor } from "@/test/test-utils";
import { AuthProvider } from "../../stores";
import { LoginForm } from "../LoginForm";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  it("focuses on the 'Email' input by default", async () => {
    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    expect(await screen.findByLabelText("Email")).toHaveFocus();
  });

  it("requires necessary values before submitting", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    await screen.findByLabelText("Email");

    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={async () => {}} />
      </AuthProvider>,
    );

    await screen.findByLabelText("Email");

    await user.type(screen.getByLabelText("Email"), "test");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Email must contain @")).toBeInTheDocument();
  });

  it("submits typed credentials and calls onLoginSuccess once", async () => {
    const user = userEvent.setup();
    const onLoginSuccess = vi.fn(async () => {});
    let body: unknown;
    server.use(
      http.post(apiRoutes.session, async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ access_token: "token" });
      }),
    );

    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </AuthProvider>,
    );

    await user.type(await screen.findByLabelText("Email"), "a@b.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => expect(onLoginSuccess).toHaveBeenCalledTimes(1));
    expect(body).toEqual({ email_address: "a@b.com", password: "secret" });
  });

  it.each([
    [401, "Incorrect Email / Password"],
    [500, "Server Error"],
  ])("shows the message for a %i response", async (status, message) => {
    const user = userEvent.setup();
    const onLoginSuccess = vi.fn(async () => {});
    server.use(
      http.post(apiRoutes.session, () => HttpResponse.json({}, { status })),
    );

    render(
      <AuthProvider>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </AuthProvider>,
    );

    await user.type(await screen.findByLabelText("Email"), "a@b.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });
});
