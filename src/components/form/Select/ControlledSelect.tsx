import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { Select } from "./Select";
import { SelectType } from "./types";

type ControlledSelectType<T extends FieldValues> = UseControllerProps<T> &
  SelectType;

export const ControlledSelect = <T extends FieldValues>({
  description,
  label,
  options,
  showAsterisk,
  ...controllerProps
}: ControlledSelectType<T>) => {
  const { field, fieldState } = useController(controllerProps);

  return (
    <Select
      label={label}
      options={options}
      description={description}
      showAsterisk={showAsterisk}
      error={fieldState.error?.message}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      ref={field.ref}
    />
  );
};
