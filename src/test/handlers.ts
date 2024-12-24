import { HttpResponse, http } from "msw";

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos", () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: "et porro tempora",
        completed: true,
      },
    ]);
  }),
  http.get(`${API_URL}/v1/users/1/categories`, () => {
    return HttpResponse.json([
      {
        id: 1,
        created_at: "2024-08-11T23:33:11.193Z",
        name: "Productive",
        updated_at: "2024-11-09T17:20:18.866Z",
        user_id: 1,
        color: "blue",
      },
      {
        id: 2,
        created_at: "2024-08-11T23:33:32.107Z",
        name: "Wellness",
        updated_at: "2024-11-09T05:39:37.605Z",
        user_id: 1,
        color: "emerald",
      },
      {
        id: 3,
        created_at: "2024-08-11T23:33:38.565Z",
        name: "Necessary",
        updated_at: "2024-11-28T06:19:29.358Z",
        user_id: 1,
        color: "amber",
      },
      {
        id: 4,
        created_at: "2024-08-11T23:33:58.056Z",
        name: "Procrastination",
        updated_at: "2024-11-09T05:39:51.571Z",
        user_id: 1,
        color: "rose",
      },
    ]);
  }),
];
