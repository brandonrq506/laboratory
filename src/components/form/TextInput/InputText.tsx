import { UseFormRegisterReturn } from "react-hook-form";

import {
  Description,
  Field,
  Input,
  InputProps,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

type Types = "text" | "password" | "email" | "search" | "url";

type TextField = InputProps;
type CustomTextField = Omit<
  TextField,
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

type Props = CustomTextField & {
  className?: string;
  description?: string;
  error?: string;
  inputClassName?: string;
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  showAsterisk?: boolean;
  type?: Types;
};

export const InputText = ({
  className,
  description,
  error,
  inputClassName,
  label,
  registration,
  showAsterisk = false,
  type = "text",
  ...props
}: Props) => {
  return (
    <Field className={clsx(className)}>
      <Label className="block text-sm leading-6 font-medium text-gray-900">
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Input
        spellCheck
        type={type}
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...registration}
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
      {error && (
        <Description className="mt-2 text-sm font-light text-red-600">
          {error}
        </Description>
      )}
    </Field>
  );
};
