import type { Color } from "../types/color";
import { colors } from "./colorObjects";
import { isColor } from "./isColor";

import { COLOR_NAME } from "@/features/colors/types/colors";

export const getColorByName = (name: string): Color => {
  const validColor = isColor(name) ? name : COLOR_NAME.WHITE;
  const color = colors.find((color) => color.name === validColor)!;
  return color;
};
