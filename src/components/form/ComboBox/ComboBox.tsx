import { useState } from "react";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { ComboBoxType } from "./types";
import { Option } from "@/types/core";
import { clsx } from "clsx";
import { filterOptions } from "./utils/filterOptions";

type ComboBoxRHFProps = {
  value: Option | null;
  onChange: (value: Option | null) => void;
  onBlur: () => void;
  name: string;
  ref: React.RefCallback<HTMLInputElement>;
  error?: string;
};

type Props = ComboBoxRHFProps & ComboBoxType;

export const ComboBox = ({
  ref,
  description,
  hideErrorMessage = false,
  hideLabel = false,
  label,
  options,
  showAsterisk = false,
  value,
  onChange,
  onBlur,
  name,
  error,
}: Props) => {
  const [query, setQuery] = useState("");

  const finalOptions = filterOptions(query, options);

  return (
    <Field>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Combobox
        as="div"
        by="value"
        value={value}
        onChange={onChange}
        onClose={() => setQuery("")}>
        <div className={clsx("relative", !hideLabel && "mt-2")}>
          <ComboboxInput
            className={clsx(
              "w-full rounded-md border-0 bg-white py-1.5 pr-10 pl-3 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6",
              error &&
                "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
            )}
            onBlur={onBlur}
            name={name}
            ref={ref}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: Option | null) => option?.label ?? ""}
            aria-invalid={Boolean(error)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
            <span className="sr-only">ComboBox button</span>
            {!error && (
              <ChevronUpDownIcon
                className="size-5 text-gray-400"
                aria-hidden="true"
              />
            )}
            {error && (
              <ExclamationCircleIcon
                className="size-5 text-red-500"
                aria-hidden="true"
              />
            )}
          </ComboboxButton>

          {finalOptions.length > 0 && (
            <ComboboxOptions
              anchor={{ to: "bottom", padding: "1.5rem", gap: "0.5rem" }}
              className="absolute z-10 mt-1 w-[var(--input-width)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-100 focus:outline-hidden sm:text-sm">
              {finalOptions.map((option) => (
                <ComboboxOption
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className="group relative cursor-default py-1.5 pr-9 pl-3 text-gray-900 select-none data-disabled:cursor-not-allowed data-disabled:opacity-60 data-focus:bg-indigo-600 data-focus:text-white">
                  <span className="block truncate data-selected:font-semibold">
                    {option.label}
                  </span>
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {description && !error && (
        <p className="mt-2 text-sm font-light text-gray-500">{description}</p>
      )}
      {error && !hideErrorMessage && (
        <p role="alert" className="mt-2 text-sm font-light text-red-600">
          {error}
        </p>
      )}
    </Field>
  );
};
