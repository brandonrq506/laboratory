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
import { formatDatetimeTo24hTime } from "@/utils";

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
  showAsterisk = false,
  ...props
}: ControlledTimeInputProps<T>) => {
  const { field, fieldState } = useController({
    defaultValue,
    disabled,
    name,
    control,
    rules,
    shouldUnregister,
  });
  const error = fieldState.error;

  const localized_24h_value = formatDatetimeTo24hTime(field.value);

  const convertBackToUTC = (hhmmss: string) => {
    const [hours, minutes, seconds] = hhmmss.split(":");
    const localDate = new Date(field.value);
    localDate.setHours(Number(hours), Number(minutes), Number(seconds));
    return localDate.toISOString();
  };

  return (
    <Field className={clsx(className)}>
      <Label>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Input
        type="time"
        onChange={(event) => {
          const utcString = convertBackToUTC(event.target.value);
          field.onChange(utcString);
        }}
        onBlur={field.onBlur}
        value={localized_24h_value}
        name={field.name}
        ref={field.ref}
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...props}
        className={clsx(
          "mt-2 block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
          "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
          "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
          "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          inputClassName,
        )}
      />
      {description && !error && (
        <Description className="mt-2 text-sm font-light text-gray-500">
          {description}
        </Description>
      )}
      {fieldState.error && (
        <Description className="mt-2 text-sm font-light text-red-600">
          {fieldState.error.message}
        </Description>
      )}
    </Field>
  );
};
