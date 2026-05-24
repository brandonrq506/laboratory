import type { ObjectValues } from "@/types/core";

export const CARD_TYPE = {
  TASK: "task",
  WRAP: "wrap",
  EXPANDED_CHILD: "expanded-child",
} as const;

export type CardType = ObjectValues<typeof CARD_TYPE>;
