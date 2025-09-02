import { FieldNamesMarkedBoolean, FieldValues } from "react-hook-form";

export type DirtyFields<T extends FieldValues> = Partial<
  Readonly<FieldNamesMarkedBoolean<T>>
>;
