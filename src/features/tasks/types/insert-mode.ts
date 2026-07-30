import type { ObjectValues } from "@/types/core";

export const INSERT_MODE = {
  APPEND: "append",
  PREPEND: "prepend",
} as const;

export type InsertMode = ObjectValues<typeof INSERT_MODE>;
