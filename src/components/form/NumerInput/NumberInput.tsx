import { Description, Field, Input, Label } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import type { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type InputProps = {
  className?: string;
  description?: string;
  error?: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  label: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  showAsterisk?: boolean;
};

export const NumberInput = ({
  className,
  description,
  error,
  hideErrorMessage = false,
  hideLabel = false,
  label,
  placeholder,
  registration,
  showAsterisk,
}: InputProps) => {
  return (
    <Field className={clsx(className)}>
      <Label
        className={clsx(
          "text-foreground block text-sm leading-6 font-medium",
          hideLabel && "sr-only",
        )}>
        <span>{label}</span>
        {showAsterisk && <span className="text-danger-strong ml-1">*</span>}
        <div className={clsx("relative", !hideLabel && "mt-2")}>
          <Input
            type="number"
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            invalid={Boolean(error)}
            {...registration}
            className={clsx(
              "bg-surface text-foreground ring-input-border placeholder:text-foreground-faint focus:ring-focus-ring block w-full rounded-md border-0 py-1.5 text-sm shadow-xs ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6",
              "disabled:bg-surface-subtle disabled:text-foreground-subtle disabled:ring-border font-light disabled:cursor-not-allowed",
              error &&
                "text-invalid-text ring-invalid-border placeholder:text-invalid-placeholder focus:ring-danger-ring",
              className,
            )}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="text-danger-text-hover h-5 w-5"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </Label>
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
