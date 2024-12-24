import { handlers } from "./handlers.js";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
