import { Input, InputProps } from "@headlessui/react";
import { clsx } from "clsx";

export const StateInputText = ({ ...props }: InputProps) => {
  return (
    <Input
      spellCheck
      {...props}
      className={clsx(
        "mt-2 block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
        "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
        "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
      )}
    />
  );
};
