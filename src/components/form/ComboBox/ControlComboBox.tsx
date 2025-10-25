import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { ComboBox } from "@/components/form";
import { ComboBoxType } from "./types";

type ControlledComboBoxProps<T extends FieldValues> = UseControllerProps<T> &
  ComboBoxType;

export const ControlComboBox = <T extends FieldValues>({
  description,
  hideErrorMessage,
  hideLabel,
  label,
  options,
  showAsterisk,
  ...controllerProps
}: ControlledComboBoxProps<T>) => {
  const {
    field: { onChange, onBlur, value, name, ref },
    fieldState,
  } = useController(controllerProps);
  return (
    <ComboBox
      description={description}
      hideErrorMessage={hideErrorMessage}
      hideLabel={hideLabel}
      label={label}
      options={options}
      showAsterisk={showAsterisk}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      ref={ref}
      error={fieldState.error?.message}
    />
  );
};
