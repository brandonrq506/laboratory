import { UseFormRegisterReturn } from "react-hook-form";
import { InputWrapper, InputWrapperPassProps } from "..";
import { transformLabel } from "@/components/utils";
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
  const inputUniqueId = `text-input-${transformLabel(label)}`;

  return (
    <InputWrapper
      wrapperClassName={wrapperClassName}
      errorClassName="flex items-center"
      label={label}
      showAsterisk={showAsterisk}
      description={description}
      error={error}>
      <input
        id={inputUniqueId}
        data-testid={inputUniqueId}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...registration}
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6",
          "font-light disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
          error &&
            "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
          className,
        )}
      />
    </InputWrapper>
  );
};
