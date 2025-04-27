import { Description, Field, Input, Label } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseFormRegisterReturn } from "react-hook-form";
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
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        <span>{label}</span>
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        <div className={clsx("relative", !hideLabel && "mt-2")}>
          <Input
            type="number"
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            invalid={Boolean(error)}
            {...registration}
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:leading-6",
              "font-light disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
              error &&
                "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
              className,
            )}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </Label>
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
