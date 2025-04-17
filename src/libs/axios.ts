import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiV1 = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ENDPOINTS
export const ACTIVITIES_ENDPOINT = "/activities";
export const CATEGORIES_ENDPOINT = "/categories";
export const EXCEL_ENDPOINT = "/excel";
export const ME_ENDPOINT = "/me";
export const ROUTINES_ENDPOINT = "/routines";
export const SESSION_ENDPOINT = "/session";
export const TASKS_ENDPOINT = "/tasks";
export const USERS_ENDPOINT = "/users";
