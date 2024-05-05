import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Option } from "@/types/core";
import { clsx } from "clsx";

/*
 *Missing:
 *- Configuration object for optional option.
 *- Show asterisk if required.
 *- Placeholder
 *- Description
 *- Error message
 */

const filterOptions = (query: string, options: Option[]) => {
  const trimmedQuery = query.trim().toLowerCase();
  return options.filter((op) => op.label.toLowerCase().includes(trimmedQuery));
};

type Props = {
  options: Option[];
  label: string;

  value: Option | null;
  onChange: (value: Option | null) => void;
  onBlur: () => void;
  name: string;
  ref: React.Ref<HTMLInputElement>;
};

export const ComboBox = ({
  options,
  label,
  value,
  onChange,
  onBlur,
  name,
  ref,
}: Props) => {
  const [query, setQuery] = useState("");

  const filteredOptions = filterOptions(query, options);

  return (
    <Combobox as="div" value={value} onChange={onChange} nullable>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-3 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onBlur={onBlur}
          name={name}
          ref={ref}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => option?.label}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
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
  );
};
