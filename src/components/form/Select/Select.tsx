import { useId } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Option } from "@/types/core";
import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type SelectProps = {
  className?: string;
  selectClassName?: string;
  label: string;
  showAsterisk?: boolean;
  registration?: Partial<UseFormRegisterReturn>;
  description?: string;
  error?: string;
  options: Option[];
};

export const Select = ({
  className,
  selectClassName,
  label,
  showAsterisk,
  registration,
  description,
  error,
  options,
}: SelectProps) => {
  const id = useId();
  const inputUniqueId = `select-input-${id}`;
  const descriptionId = `select-input-description-${id}`;
  const errorId = `select-input-error-${id}`;

  return (
    <div className={clsx(className)}>
      <label
        htmlFor={inputUniqueId}
        className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </label>

      <div className="relative mt-2">
        <select
          id={inputUniqueId}
          {...registration}
          aria-describedby={error ? errorId : descriptionId}
          aria-invalid={Boolean(error)}
          className={clsx(
            "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
            error &&
              "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
            selectClassName,
          )}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {description && !error && (
        <p id={descriptionId} className="mt-2 text-sm font-light text-gray-500">
          {description}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm font-light text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
