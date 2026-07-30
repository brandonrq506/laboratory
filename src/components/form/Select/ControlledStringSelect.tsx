import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import { StringSelect } from "./StringSelect";
import type { StringSelectType } from "./types";

type ControlledSelectType<T extends FieldValues> = UseControllerProps<T> &
  StringSelectType;

export const ControlledStringSelect = <T extends FieldValues>({
  description,
  label,
  hideErrorMessage = false,
  hideLabel = false,
  options,
  showAsterisk,
  ...controllerProps
}: ControlledSelectType<T>) => {
  const {
    field: { onChange, onBlur, value, name, ref },
    fieldState,
  } = useController(controllerProps);

  return (
    <StringSelect
      description={description}
      hideErrorMessage={hideErrorMessage}
      hideLabel={hideLabel}
      label={label}
      options={options}
      showAsterisk={showAsterisk}
      error={fieldState.error?.message}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      ref={ref}
    />
  );
};
