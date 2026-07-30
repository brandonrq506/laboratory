import type { ObjectValues } from "@/types/core";

export const COLOR_NAME = {
  WHITE: "white",
  ROSE: "rose",
  AMBER: "amber",
  EMERALD: "emerald",
  TEAL: "teal",
  CYAN: "cyan",
  SKY: "sky",
  BLUE: "blue",
  INDIGO: "indigo",
  VIOLET: "violet",
  PURPLE: "purple",
  FUCHSIA: "fuchsia",
  PINK: "pink",
} as const;

export type Colors = ObjectValues<typeof COLOR_NAME>;
