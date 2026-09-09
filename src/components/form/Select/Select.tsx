import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import {
  Description,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import type { Option } from "@/types/core";
import type { SelectType } from "./types";
import { clsx } from "clsx";

type SelectRHFProps = {
  value: Option | undefined;
  onChange: (value: Option) => void;
  onBlur: () => void;
  name: string;
  ref?: React.RefCallback<HTMLButtonElement>;
  error?: string;
};

type Props = SelectRHFProps & SelectType;

export const Select = ({
  ref,
  description,
  hideErrorMessage = false,
  hideLabel = false,
  label,
  options,
  showAsterisk,
  value,
  onChange,
  onBlur,
  name,
  error,
}: Props) => {
  return (
    <Field className="w-full">
      <Label
        className={clsx(
          "text-foreground block text-sm leading-6 font-medium",
          hideLabel && "sr-only",
        )}>
        {label}{" "}
        {showAsterisk && <span className="text-danger-strong ml-1">*</span>}
      </Label>

      <Listbox
        as="div"
        by="value"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={clsx(!hideLabel && "mt-2")}>
        <ListboxButton
          ref={ref}
          data-invalid={error}
          className={clsx(
            "bg-surface text-foreground ring-input-border focus:ring-focus-ring relative w-full cursor-pointer rounded-md py-1.5 pr-10 pl-3 text-left shadow-xs ring-1 ring-inset focus:ring-2 focus:outline-hidden sm:text-sm sm:leading-6",
            "data-invalid:text-invalid-text data-invalid:ring-invalid-border data-invalid:placeholder:text-invalid-placeholder data-invalid:focus:ring-danger-ring",
          )}>
          <span className="block truncate">
            {value?.label || "Missing Default"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="text-foreground-faint size-5"
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          anchor={{ to: "bottom end", padding: "1.5rem" }}
          className="bg-elevated ring-border-subtle absolute z-10 mt-1 max-h-60 w-[var(--button-width)] min-w-fit overflow-auto rounded-md py-1 text-base shadow-lg ring-1 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
          {options.map((option) => (
            <ListboxOption
              value={option}
              key={option.value}
              disabled={option.disabled}
              className="group text-foreground data-focus:bg-selection data-focus:text-selection-foreground relative cursor-default py-2 pr-9 pl-3 select-none">
              <span className="block truncate font-normal group-data-selected:font-semibold">
                {option.label}
              </span>

              <span className="text-accent group-data-focus:text-selection-foreground absolute inset-y-0 right-0 flex items-center pr-4 [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      {description && !error && (
        <Description className="text-foreground-subtle mt-2 text-sm font-light">
          {description}
        </Description>
      )}
      {error && !hideErrorMessage && (
        <Description className="text-danger-text mt-2 text-sm font-light">
          {error}
        </Description>
      )}
    </Field>
  );
};
