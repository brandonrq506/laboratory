import { useId } from "react";

import { InputWrapper, InputWrapperPassProps } from "..";
import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type Types = "text" | "password" | "email" | "search" | "url";

type InputProps = InputWrapperPassProps & {
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: Types;
};

export const TextInput = ({
  type = "text",
  registration,
  className,
  wrapperClassName,
  placeholder,
  disabled,
  label,
  showAsterisk,
  description,
  error,
}: InputProps) => {
  const id = useId();
  const inputUniqueId = `file-input-${id}`;
  const descriptionId = `file-input-description-${id}`;
  const errorId = `file-input-error-${id}`;

  return (
    <InputWrapper
      wrapperClassName={wrapperClassName}
      errorClassName="flex items-center"
      label={label}
      showAsterisk={showAsterisk}
      description={description}
      descriptionId={descriptionId}
      error={error}
      errorId={errorId}>
      <input
        id={inputUniqueId}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={error ? errorId : descriptionId}
        aria-invalid={Boolean(error)}
        {...registration}
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:leading-6",
          "font-light disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
          error &&
            "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
          className,
        )}
      />
    </InputWrapper>
  );
};
