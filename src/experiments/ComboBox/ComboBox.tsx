import { useState } from "react";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Option } from "@/types/core";
import { clsx } from "clsx";

type ComboBoxProps = {
  onChange: (value: Option | null) => void;
  options: Option[];
  label: string;
  onQueryChange?: (value: string) => void;
  selectedOption: Option | null;
  dynamicOption?: boolean;
  showAsterisk?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
  error?: string;
};

export const ComboBox = ({
  onChange,
  selectedOption,
  // dynamicOption = false,
  showAsterisk = false,
  options = [],
  label,
  onQueryChange,
  description,
  placeholder,
  className,
  error,
}: ComboBoxProps) => {
  const [query, setQuery] = useState("");
  // const option = { value: -1, label: query };

  const filteredOptions =
    query === ""
      ? options
      : options.filter((person) => {
          return person.label.toLowerCase().includes(query.toLowerCase());
        });

  // const displayDynamicOption = dynamicOption && filteredOptions.length === 0;

  return (
    <>
      <Combobox
        as="div"
        value={selectedOption}
        onChange={onChange}
        by="value"
        className={clsx(className)}
        nullable>
        <Combobox.Label className="block text-sm leading-6 font-medium text-gray-900">
          {label}
          {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        </Combobox.Label>
        <div className="relative mt-2 font-light">
          <Combobox.Button className="flex w-full items-center">
            <Combobox.Input
              autoComplete="off"
              placeholder={placeholder}
              displayValue={(option: Option) => option?.label}
              onChange={(event) => {
                const value = event.target.value;
                if (onQueryChange) onQueryChange(value);
                setQuery(value);
              }}
              className={clsx(
                "w-full rounded-md border-0 bg-white py-1.5 pr-10 pl-3 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6",
                error &&
                  "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
              )}
            />
            <ChevronUpDownIcon
              className="-ml-7 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Combobox.Options className="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-hidden sm:text-sm">
            {filteredOptions.length > 0 &&
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default py-2 pr-9 pl-3 select-none",
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
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
            {/* {displayDynamicOption && (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }>
                {({ active, selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-semibold",
                      )}>
                      {`Add: "${query}"`}
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
            )} */}
          </Combobox.Options>
          {error && (
            <div
              className={clsx(
                "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
              )}>
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {description && !error && (
          <p className="mt-2 text-sm font-light text-gray-500">{description}</p>
        )}
        {error && (
          <p role="alert" className="mt-2 text-sm font-light text-red-600">
            {error}
          </p>
        )}
      </Combobox>
    </>
  );
};
