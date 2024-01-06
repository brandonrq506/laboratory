import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

type InputWrapperProps = {
  wrapperClassName?: string;
  errorClassName?: string;
  label: string;
  showAsterisk?: boolean;
  children: React.ReactNode;
  description?: string;
  error?: string;
};

export type InputWrapperPassProps = Omit<InputWrapperProps, "children">;

export const InputWrapper = ({
  wrapperClassName,
  errorClassName,
  label,
  showAsterisk,
  children,
  description,
  error,
}: InputWrapperProps) => {
  return (
    <div className={clsx(wrapperClassName)}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        <span>{label}</span>
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        <div className="relative mt-2">
          {children}
          {error && (
            <div
              className={clsx(
                "pointer-events-none absolute inset-y-0 right-0 pr-3",
                errorClassName,
              )}>
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </label>
      {description && !error && (
        <p className="mt-2 text-sm font-light text-gray-500">{description}</p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm font-light text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
