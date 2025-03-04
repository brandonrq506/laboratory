import {
  Description,
  Field,
  Input,
  InputProps,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

type CustomProps = {
  className?: string;
  description?: string;
  hideLabel?: boolean;
  label: string;
  showAsterisk?: boolean;
  inputClassName?: string;
};

type Props = CustomProps & Omit<InputProps, "type">;

export const DateInput = ({
  className,
  description,
  hideLabel,
  inputClassName,
  label,
  showAsterisk,
  ...inputProps
}: Props) => {
  return (
    <Field className={className}>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Input
        type="date"
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
          "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
          "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
          "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          !hideLabel && "mt-2",
          inputClassName,
        )}
        {...inputProps}
      />
      {description && (
        <Description className="mt-2 text-sm font-light text-gray-500">
          {description}
        </Description>
      )}
    </Field>
  );
};
