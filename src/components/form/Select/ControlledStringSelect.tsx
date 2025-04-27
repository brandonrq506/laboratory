import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { StringSelect } from "./StringSelect";
import { StringSelectType } from "./types";

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
  const { field, fieldState } = useController(controllerProps);

  return (
    <StringSelect
      description={description}
      hideErrorMessage={hideErrorMessage}
      hideLabel={hideLabel}
      label={label}
      options={options}
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
