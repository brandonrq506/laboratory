import { HttpResponse, http } from "msw";
import { render, screen } from "@/test/test-utils";
import { AdminProtectedContent } from "../AdminProtectedContent";
import { ME_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${ME_ENDPOINT}`;

describe("AdminProtectedContent", () => {
  it("renders children when user is admin", async () => {
    server.use(
      http.get(BASE_URL, () =>
        HttpResponse.json(
          {
            id: 1,
            created_at: "2024-01-01T00:00:00.000Z",
            email_address: "admin@example.com",
            first_name: "Ada",
            is_admin: true,
            last_name: "Lovelace",
            updated_at: "2024-01-01T00:00:00.000Z",
          },
          { status: 200 },
        ),
      ),
    );

    render(
      <AdminProtectedContent>
        <div>Top Secret Content</div>
      </AdminProtectedContent>,
    );

    expect(await screen.findByText(/Top Secret Content/i)).toBeInTheDocument();
  });

  it("does not render children for non-admin users", () => {
    // Default handler returns is_admin: false
    render(
      <AdminProtectedContent>
        <div>Hidden Content</div>
      </AdminProtectedContent>,
    );

    // Should never appear
    expect(screen.queryByText(/Hidden Content/i)).not.toBeInTheDocument();
  });
});
