import { Colors } from "../types/colors";
import { colors } from "./colorObjects";

export const isColor = (color: string): color is Colors => {
  return colors.map((color) => color.name).includes(color as Colors);
};
