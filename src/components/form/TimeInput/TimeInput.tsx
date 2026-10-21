import {
  Description,
  Field,
  Input,
  type InputProps,
  Label,
} from "@headlessui/react";
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import type { TimeInputTransform } from "./types";
import { clsx } from "clsx";

type CustomTimeField = Omit<
  InputProps,
  | "onChange"
  | "onBlur"
  | "ref"
  | "name"
  | "min"
  | "max"
  | "maxLength"
  | "minLength"
  | "pattern"
  | "required"
>;

type CustomTimeProps = CustomTimeField & {
  description?: string;
  inputClassName?: string;
  label: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  showAsterisk?: boolean;
  transform: TimeInputTransform;
};

type ControlledTimeInputProps<
  T extends FieldValues,
  TName extends FieldPath<T>,
> = UseControllerProps<T, TName> & CustomTimeProps;

export const TimeInput = <T extends FieldValues, TName extends FieldPath<T>>({
  defaultValue,
  disabled,
  name,
  control,
  rules,
  shouldUnregister,

  className,
  description,
  inputClassName,
  label,
  hideErrorMessage = false,
  hideLabel = false,
  showAsterisk = false,
  transform,
  ...props
}: ControlledTimeInputProps<T, TName>) => {
  const {
    field: { onChange, onBlur, value, name: rhfName, ref },
    fieldState,
  } = useController({
    defaultValue,
    disabled,
    name,
    control,
    rules,
    shouldUnregister,
  });

  const error = fieldState.error;

  return (
    <Field className={clsx(className)}>
      <Label
        className={clsx(
          "text-foreground block text-sm leading-6 font-medium",
          hideLabel && "sr-only",
        )}>
        {label}{" "}
        {showAsterisk && <span className="text-danger-strong ml-1">*</span>}
      </Label>
      <Input
        type="time"
        onChange={(event) => onChange(transform.output(event.target.value))}
        onBlur={onBlur}
        value={transform.input(value)}
        name={rhfName}
        ref={ref}
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...props}
        className={clsx(
          "bg-surface text-foreground ring-input-border placeholder:text-foreground-faint block w-full rounded-md border-0 py-1.5 text-sm font-light shadow-xs ring-1 ring-inset sm:leading-6",
          "data-focus:ring-focus-ring data-focus:ring-2 data-focus:ring-inset",
          "data-disabled:bg-surface-subtle data-disabled:text-foreground-subtle data-disabled:ring-border data-disabled:cursor-not-allowed",
          "data-invalid:text-invalid-text data-invalid:ring-invalid-border data-invalid:placeholder:text-invalid-placeholder data-invalid:focus:ring-danger-ring",
          !hideLabel && "mt-2",
          inputClassName,
        )}
      />
      {description && !error && (
        <Description className="text-foreground-subtle mt-2 text-sm font-light">
          {description}
        </Description>
      )}
      {fieldState.error && !hideErrorMessage && (
        <Description className="text-danger-text mt-2 text-sm font-light">
          {fieldState.error.message}
        </Description>
      )}
    </Field>
  );
};
