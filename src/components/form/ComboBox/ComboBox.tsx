import { forwardRef, useState } from "react";
import { clsx } from "clsx";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { ComboBoxType, Configuration } from "./types";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { Option } from "@/types/core";

const filterOptions = (query: string, options: Option[]) => {
  const trimmedQuery = query.trim().toLowerCase();
  return options.filter((op) => op.label.toLowerCase().includes(trimmedQuery));
};

const addOption = (first: boolean, option: Option, options: Option[]) => {
  return first ? [option, ...options] : [...options, option];
};

const handleConfiguration = (options: Option[], config: Configuration) => {
  const { text, isPersistent = false, showFirst = false } = config;
  const hasOptions = options.length > 0;
  const option: Option = { value: -1, label: text };
  const alwaysVisible = hasOptions && isPersistent;

  if (alwaysVisible) return addOption(showFirst, option, options);
  else if (hasOptions) return options;
  return [option];
};

type ComboBoxRHFProps = {
  value: Option | null;
  onChange: (value: Option | null) => void;
  onBlur: () => void;
  name: string;
  ref: React.Ref<HTMLInputElement>;
  error?: string;
};

type Props = ComboBoxRHFProps & ComboBoxType;

export const ComboBox = forwardRef<HTMLInputElement, Props>(
  (
    {
      config,
      description,
      label,
      options,
      showAsterisk = false,

      value,
      onChange,
      onBlur,
      name,
      error,
    },
    ref,
  ) => {
    const [query, setQuery] = useState("");

    const filteredOptions = filterOptions(query, options);
    const hasConfig = config !== undefined;

    const finalOptions = hasConfig
      ? handleConfiguration(filteredOptions, config)
      : filteredOptions;

    return (
      <Field>
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        </Label>
        <Combobox
          as="div"
          by="value"
          value={value}
          onChange={onChange}
          onClose={() => setQuery("")}>
          <div className="relative mt-2">
            <ComboboxInput
              className={clsx(
                "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                error &&
                  "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
              )}
              onBlur={onBlur}
              name={name}
              ref={ref}
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: Option | null) => option?.label ?? ""}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
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
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {finalOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    value={option}
                    disabled={option.disabled}
                    className="group relative cursor-default select-none py-1.5 pl-3 pr-9 text-gray-900 data-[disabled]:cursor-not-allowed data-[focus]:bg-indigo-600 data-[focus]:text-white data-[disabled]:opacity-60">
                    <span className="block truncate data-[selected]:font-semibold">
                      {option.label}
                    </span>
                    <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
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
        {error && (
          <p role="alert" className="mt-2 text-sm font-light text-red-600">
            {error}
          </p>
        )}
      </Field>
    );
  },
);
