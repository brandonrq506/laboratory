import {
  Description,
  Field,
  Input,
  InputProps,
  Label,
} from "@headlessui/react";
import { UseFormRegisterReturn } from "react-hook-form";

import clsx from "clsx";

type CustomTextField = Omit<
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

type Props = {
  className?: string;
  description?: string;
  error?: string;
  hideLabel?: boolean;
  label: string;
  showAsterisk?: boolean;
  minutesProps?: CustomTextField;
  hoursProps?: CustomTextField;
  minutesregistration: Partial<UseFormRegisterReturn>;
  hoursregistration: Partial<UseFormRegisterReturn>;
};

export const DurationInput = ({
  className,
  description,
  error,
  hideLabel = false,
  label,
  minutesProps,
  hoursProps,
  minutesregistration,
  hoursregistration,
  showAsterisk,
}: Props) => {
  return (
    <Field className={clsx(className)}>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        <span>{label}</span>
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <div
        className={clsx(
          "relative flex items-center gap-1",
          !hideLabel && "mt-2",
        )}>
        <Input
          type="number"
          invalid={Boolean(error)}
          aria-invalid={Boolean(error)}
          {...hoursregistration}
          {...hoursProps}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
            "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
            "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
            "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          )}
        />
        :
        <Input
          type="number"
          invalid={Boolean(error)}
          aria-invalid={Boolean(error)}
          {...minutesregistration}
          {...minutesProps}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
            "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
            "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
            "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          )}
        />
      </div>
      {description && !error && (
        <Description className="mt-2 text-sm font-light text-gray-500">
          {description}
        </Description>
      )}
      {error && (
        <Description
          role="alert"
          className="mt-2 text-sm font-light text-red-600">
          {error}
        </Description>
      )}
    </Field>
  );
};
