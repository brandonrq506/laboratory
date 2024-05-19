import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { ComboBox } from "@/components/form";
import { Option } from "@/types/core";

type ControlledComboBoxProps<T extends FieldValues> = UseControllerProps<T> & {
  options: Option[];
  label: string;
};

export const ControlledComboBox = <T extends FieldValues>({
  options,
  label,
  ...controllerProps
}: ControlledComboBoxProps<T>) => {
  const { field, fieldState } = useController(controllerProps);
  return (
    <ComboBox
      label={label}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      ref={field.ref}
      error={fieldState.error?.message}
      options={options}
    />
  );
};
/**
 * Explanation of: Why do you need to declare the type of ControlledComboBoxProps the way you did and why you later need to use object spread to pass the props to useController?
 *
 * 1. type ControlledComboBoxProps<T extends FieldValues> = UseControllerProps<T> & {
 *      options: Option[];
 *      label: string;
 *    };
 *
 * 2.type ControlledComboBoxProps = UseControllerProps & {
 *      options: Option[];
 *      label: string;
 *    };
 *
 * 3. type ControlledComboBoxProps = UseControllerProps: {name: NameType, rules: RulesType} & {
 *      options: {value: number: label: string; };
 *      label: string;
 *    };
 *
 * NOTE: In TypeScript, when you use the & operator to combine types, it does not create a nested structure. Instead,  * it merges the properties of the types being combined into a single, flat object type. Result is Step 4.
 *
 * 4. type ControlledComboBoxProps = {
 *      name: NameType;
 *      rules: RulesType;
 *      options: Option[];
 *      label: string;
 *    };
 *
 * 5. The reason why I do { options, label, ...controllerProps } is so I don't have to manually pass each prop to
 *    useController. This way, I can pass all the props to useController without having to manually pass each prop.
 *
 * 6. I would have to do {options, label, name, rules, etc...} if I didn't use object spread.
 *    And then do useController({name, rules, etc...}) which is more verbose.
 *
 */
