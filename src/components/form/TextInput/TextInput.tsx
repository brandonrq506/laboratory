import type { UseFormRegisterReturn } from "react-hook-form";

import {
  Description,
  Field,
  Input,
  type InputProps,
  Label,
} from "@headlessui/react";
import type { ObjectValues } from "@/types/core";
import clsx from "clsx";

const INPUT_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  SEARCH: "search",
  URL: "url",
} as const;

type Types = ObjectValues<typeof INPUT_TYPE>;

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
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  showAsterisk?: boolean;
  type?: Types;
};

export const TextInput = ({
  className,
  description,
  error,
  inputClassName,
  label,
  hideErrorMessage = false,
  hideLabel = false,
  registration,
  showAsterisk = false,
  type = INPUT_TYPE.TEXT,
  ...props
}: Props) => {
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
        spellCheck
        type={type}
        aria-invalid={Boolean(error)}
        invalid={Boolean(error)}
        {...registration}
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
      {error && !hideErrorMessage && (
        <Description
          role="alert"
          className="text-danger-text mt-2 text-sm font-light">
          {error}
        </Description>
      )}
    </Field>
  );
};
