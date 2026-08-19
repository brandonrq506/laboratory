import { HttpResponse, http } from "msw";
import { apiRoutes } from "./api-routes";

export const userHandlers = [
  http.get(apiRoutes.me, () => {
    return HttpResponse.json(
      {
        id: 1,
        created_at: "2024-01-01T00:00:00.000Z",
        email_address: "john.doe@example.com",
        first_name: "John",
        is_admin: false,
        last_name: "Doe",
        updated_at: "2024-01-01T00:00:00.000Z",
      },
      { status: 200 },
    );
  }),
];
