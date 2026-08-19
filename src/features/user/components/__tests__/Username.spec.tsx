import { HttpResponse, http } from "msw";
import { render, screen } from "@/test/test-utils";
import { Username } from "../Username";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

describe("Username", () => {
  it("renders the user's full name when available", async () => {
    render(<Username />);
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  });

  it("renders 'Unknown User' when names are missing", async () => {
    server.use(
      http.get(apiRoutes.me, () =>
        HttpResponse.json(
          {
            id: 2,
            created_at: "2024-01-01T00:00:00.000Z",
            email_address: "unknown@example.com",
            first_name: "",
            is_admin: false,
            last_name: null,
            updated_at: "2024-01-01T00:00:00.000Z",
          },
          { status: 200 },
        ),
      ),
    );

    render(<Username />);
    expect(await screen.findByText(/Unknown User/i)).toBeInTheDocument();
  });
});
