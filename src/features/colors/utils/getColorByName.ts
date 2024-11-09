import { Color } from "../types/color";
import { colors } from "./colorObjects";
import { isColor } from "./isColor";

export const getColorByName = (name: string): Color => {
  const validColor = isColor(name) ? name : "white";
  const color = colors.find((color) => color.name === validColor)!;
  return color;
};
