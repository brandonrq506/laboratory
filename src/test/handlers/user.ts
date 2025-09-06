import { HttpResponse, http } from "msw";
import { ME_ENDPOINT } from "@/libs/axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${ME_ENDPOINT}`;

export const userHandlers = [
  http.get(BASE_URL, () => {
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
