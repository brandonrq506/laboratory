import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiV1 = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to reject HTML responses
apiV1.interceptors.response.use(
  (response: AxiosResponse) => {
    const contentType = response.headers["content-type"];

    // Check if the response contains HTML
    if (contentType && contentType.includes("text/html")) {
      return Promise.reject(
        new Error("Received HTML response when JSON was expected"),
      );
    }

    return response;
  },
  (error: AxiosError) => {
    // Also check error responses for HTML content
    if (error.response) {
      const contentType = error.response.headers["content-type"];

      if (contentType && contentType.includes("text/html")) {
        return Promise.reject(
          new Error("Received HTML error response when JSON was expected"),
        );
      }
    }

    return Promise.reject(error);
  },
);

// ENDPOINTS
export const ACTIVITIES_ENDPOINT = "/activities";
export const CATEGORIES_ENDPOINT = "/categories";
export const EXCEL_ENDPOINT = "/excel";
export const ME_ENDPOINT = "/me";
export const ROUTINES_ENDPOINT = "/routines";
export const SESSION_ENDPOINT = "/session";
export const TASKS_ENDPOINT = "/tasks";
export const USER_PREFERENCES_ENDPOINT = "/user_preferences";
export const USERS_ENDPOINT = "/users";
