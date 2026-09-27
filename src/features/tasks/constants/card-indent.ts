import { CARD_TYPE, type CardType } from "../types/card-types";

/** Expanded children sit indented under their wrap: in the list and while dragged. */
export const CARD_INDENT_CLASS = {
  [CARD_TYPE.TASK]: "",
  [CARD_TYPE.WRAP]: "",
  [CARD_TYPE.EXPANDED_CHILD]: "ml-4",
} satisfies Record<CardType, string>;
