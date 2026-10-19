import type {
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import type { Colors } from "./colors";

export type ColorSelectProps<T extends FieldValues> = UseControllerProps<
  T,
  FieldPathByValue<T, Colors>
>;
