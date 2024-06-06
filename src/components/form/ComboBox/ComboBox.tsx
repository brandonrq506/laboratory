import { forwardRef, useState } from "react";
import { clsx } from "clsx";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Option } from "@/types/core";

type BaseConfig = { text: string };
type PersistentConfig = { isPersistent: true; showFirst: boolean };
type NonPersistentConfig = { isPersistent?: false; showFirst?: false };
type Configuration = BaseConfig & (PersistentConfig | NonPersistentConfig);

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
  else return [option];
};

type ComboBoxRHFProps = {
  value: Option | null;
  onChange: (value: Option | null) => void;
  onBlur: () => void;
  name: string;
  ref: React.Ref<HTMLInputElement>;
  error?: string;
};

export type ComboBoxProps = {
  options: Option[];
  label: string;
  config?: Configuration;
  showAsterisk?: boolean;
  description?: string;
};

type Props = ComboBoxRHFProps & ComboBoxProps;

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
      <>
        <Combobox as="div" value={value} onChange={onChange} nullable>
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}{" "}
            {showAsterisk && <span className="ml-1 text-red-700">*</span>}
          </Combobox.Label>
          <div className="relative mt-2">
            <Combobox.Input
              className={clsx(
                "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                error &&
                  "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
              )}
              onBlur={onBlur}
              name={name}
              ref={ref}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: Option | null) => option?.label ?? ""}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
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
            </Combobox.Button>

            {finalOptions.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {finalOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option}
                    disabled={option.disabled}
                    className={({ active, disabled }) =>
                      clsx(
                        "relative cursor-default select-none py-1.5 pl-3 pr-9",
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        disabled && "cursor-not-allowed opacity-60",
                      )
                    }>
                    {({ active, selected }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            selected && "font-semibold",
                          )}>
                          {option.label}
                        </span>

                        {selected && (
                          <span
                            className={clsx(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600",
                            )}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
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
      </>
    );
  },
);
