import { UseFormRegisterReturn } from "react-hook-form";

import {
  Description,
  Field,
  Label,
  Textarea,
  TextareaProps,
} from "@headlessui/react";
import clsx from "clsx";

type CustomTextArea = Omit<
  TextareaProps,
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

type Props = CustomTextArea & {
  className?: string;
  description?: string;
  error?: string;
  inputClassName?: string;
  label: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  showAsterisk?: boolean;
};

export const TextArea = ({
  className,
  description,
  error,
  inputClassName,
  label,
  hideErrorMessage = false,
  hideLabel = false,
  registration,
  showAsterisk = false,
  ...props
}: Props) => {
  return (
    <Field className={clsx(className)}>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Textarea
        spellCheck
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...registration}
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
      {error && !hideErrorMessage && (
        <Description
          role="alert"
          className="mt-2 text-sm font-light text-red-600">
          {error}
        </Description>
      )}
    </Field>
  );
};
