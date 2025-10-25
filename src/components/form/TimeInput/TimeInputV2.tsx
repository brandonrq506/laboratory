import {
  Description,
  Field,
  Input,
  InputProps,
  Label,
} from "@headlessui/react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { clsx } from "clsx";
import { format } from "date-fns";

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
};

type ControlledTimeInputProps<T extends FieldValues> = UseControllerProps<T> &
  CustomTimeProps;

export const TimeInputV2 = <T extends FieldValues>({
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
  ...props
}: ControlledTimeInputProps<T>) => {
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

  const localized_24h_value = format(value, "HH:mm");

  const convertBackToUTC = (hhmmss: string) => {
    const [hours, minutes] = hhmmss.split(":");
    const localDate = new Date(value);
    localDate.setHours(Number(hours), Number(minutes));
    return localDate.toISOString();
  };

  return (
    <Field className={clsx(className)}>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Input
        type="time"
        onChange={(event) => {
          const utcString = convertBackToUTC(event.target.value);
          onChange(utcString);
        }}
        onBlur={onBlur}
        value={localized_24h_value}
        name={rhfName}
        ref={ref}
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...props}
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
          "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
          "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
          "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          !hideLabel && "mt-2",
          inputClassName,
        )}
      />
      {description && !error && (
        <Description className="mt-2 text-sm font-light text-gray-500">
          {description}
        </Description>
      )}
      {fieldState.error && !hideErrorMessage && (
        <Description className="mt-2 text-sm font-light text-red-600">
          {fieldState.error.message}
        </Description>
      )}
    </Field>
  );
};
