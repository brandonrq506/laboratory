import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseFormRegisterReturn } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { InputWrapperPassProps } from "..";
import { clsx } from "clsx";

type FileProps = InputWrapperPassProps & {
  registration: Partial<UseFormRegisterReturn>;
  multiple?: boolean;
  accept?: string;
  className?: string;
  dropAreaClassName?: string;
};

export const FileInput = ({
  label,
  registration,
  className,
  error,
  description,
  dropAreaClassName,
  multiple = false,
  showAsterisk = false,
  accept = ".jpg, .jpeg, .png",
}: FileProps) => {
  return (
    <div className={clsx("col-span-full", className)}>
      {/* Label */}
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900">
        <span>{label}</span>
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </label>

      {/* Input */}
      <div
        className={clsx(
          "relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
          dropAreaClassName,
          error && "border-red-300",
        )}>
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className={clsx(
                "relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500",
                error && "text-red-700 ring-red-300 focus:ring-red-500",
              )}>
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple={multiple}
                accept={accept}
                {...registration}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>

        {/* Error Icon */}
        {error && (
          <div className="items-base pointer-events-none absolute inset-y-0 right-0 flex pr-3 pt-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Error & Description */}
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
