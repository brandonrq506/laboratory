import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { ComboBox, ComboBoxProps } from "@/components/form";

type ControlledComboBoxProps<T extends FieldValues> = UseControllerProps<T> &
  ComboBoxProps;

export const ControlComboBox = <T extends FieldValues>({
  config,
  description,
  label,
  options,
  showAsterisk,
  ...controllerProps
}: ControlledComboBoxProps<T>) => {
  const { field, fieldState } = useController(controllerProps);
  return (
    <ComboBox
      config={config}
      description={description}
      label={label}
      options={options}
      showAsterisk={showAsterisk}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      ref={field.ref}
      error={fieldState.error?.message}
    />
  );
};
