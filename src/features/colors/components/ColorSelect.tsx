import { COLOR_NAME } from "../types/colors";
import { StringSelect } from "@/components/form/Select/StringSelect";

import { type FieldValues, useController } from "react-hook-form";
import type { ColorSelectProps } from "../types/color-select";

export const ColorSelect = <T extends FieldValues>({
  ...controllerProps
}: ColorSelectProps<T>) => {
  const {
    field: { onChange, onBlur, value, name, ref, disabled },
    fieldState,
  } = useController(controllerProps);
  const options = Object.values(COLOR_NAME).map((color) => ({
    value: color,
    label: color,
  }));

  return (
    <StringSelect
      label="Color"
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(option) => {
        const color = options.find((color) => color.value === option.value);
        if (color) onChange(color.value);
      }}
      onBlur={onBlur}
      name={name}
      ref={ref}
      disabled={disabled}
      error={fieldState.error?.message}
    />
  );
};
