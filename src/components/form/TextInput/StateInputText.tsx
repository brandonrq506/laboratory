import { Input, type InputProps } from "@headlessui/react";
import { clsx } from "clsx";

export const StateInputText = ({ ...props }: InputProps) => {
  return (
    <Input
      spellCheck
      {...props}
      className={clsx(
        "bg-surface text-foreground ring-input-border placeholder:text-foreground-faint mt-2 block w-full rounded-md border-0 py-1.5 text-sm font-light shadow-xs ring-1 ring-inset sm:leading-6",
        "data-focus:ring-focus-ring data-focus:ring-2 data-focus:ring-inset",
        "data-disabled:bg-surface-subtle data-disabled:text-foreground-subtle data-disabled:ring-border data-disabled:cursor-not-allowed",
      )}
    />
  );
};
