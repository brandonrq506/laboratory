import { useId } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type InputProps = {
  className?: string;
  label: string;
  showAsterisk?: boolean;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  description?: string;
  error?: string;
};

export const NumberInput = ({
  className,
  label,
  showAsterisk,
  placeholder,
  registration,
  description,
  error,
}: InputProps) => {
  const id = useId();
  const descriptionId = `number-input-description-${id}`;
  const errorId = `number-input-error-${id}`;

  return (
    <div className={clsx(className)}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        <span>{label}</span>
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        <div className="relative mt-2">
          <input
            type="number"
            placeholder={placeholder}
            aria-describedby={error ? errorId : descriptionId}
            aria-invalid={Boolean(error)}
            {...registration}
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6",
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
      </label>
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
