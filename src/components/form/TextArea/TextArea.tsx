import { useId } from "react";

import { InputWrapper, InputWrapperPassProps } from "..";
import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

const sizes = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
};

type Props = InputWrapperPassProps & {
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: keyof typeof sizes;
};

export function TextArea({
  size = "sm",
  wrapperClassName,
  label,
  showAsterisk,
  description,
  error,
  className,
  registration,
  placeholder,
  disabled,
}: Props) {
  const id = useId();
  const inputUniqueId = `file-input-${id}`;
  const descriptionId = `file-input-description-${id}`;
  const errorId = `file-input-error-${id}`;

  return (
    <InputWrapper
      wrapperClassName={wrapperClassName}
      errorClassName="flex items-start pt-3"
      label={label}
      showAsterisk={showAsterisk}
      description={description}
      descriptionId={descriptionId}
      error={error}
      errorId={errorId}>
      <textarea
        id={inputUniqueId}
        rows={sizes[size]}
        disabled={disabled}
        placeholder={placeholder}
        {...registration}
        aria-describedby={error ? errorId : descriptionId}
        aria-invalid={Boolean(error)}
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
          error &&
            "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
          className,
        )}
      />
    </InputWrapper>
  );
}
