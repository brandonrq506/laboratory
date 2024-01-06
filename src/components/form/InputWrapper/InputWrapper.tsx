import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

type InputWrapperProps = {
  wrapperClassName?: string;
  label: string;
  showAsterisk?: boolean;
  children: React.ReactNode;
  description?: string;
  error?: string;
};

export type InputWrapperPassProps = Omit<InputWrapperProps, "children">;

export const InputWrapper = ({
  wrapperClassName,
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
        <p className="mt-2 text-sm text-gray-500 font-light">{description}</p>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-600 font-light">{error}</p>}
    </div>
  );
};
