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
import { StringOption } from "@/types/core";
import { StringSelectType } from "./types";
import { clsx } from "clsx";
import { forwardRef } from "react";

type SelectRHFProps = {
  value: StringOption | null;
  onChange: (value: StringOption) => void;
  onBlur: () => void;
  name: string;
  ref: React.Ref<HTMLButtonElement>;
  error?: string;
};

type Props = SelectRHFProps & StringSelectType;

export const StringSelect = forwardRef<HTMLButtonElement, Props>(
  (
    {
      description,
      label,
      options,
      showAsterisk,

      value,
      onChange,
      onBlur,
      name,
      error,
    },
    ref,
  ) => {
    return (
      <Field className="w-full">
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
        </Label>

        <Listbox
          as="div"
          by="value"
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="mt-2">
          <ListboxButton
            ref={ref}
            data-invalid={error}
            className={clsx(
              "relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
              "data-[invalid]:text-red-900 data-[invalid]:ring-red-300 data-[invalid]:placeholder:text-red-300 data-[invalid]:focus:ring-red-500",
            )}>
            <span className="block truncate">
              {value?.label || "Missing Default"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
            </span>
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className="absolute z-10 mt-1 max-h-60 w-[var(--button-width)] min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
            {options.map((option) => (
              <ListboxOption
                value={option}
                key={option.value}
                disabled={option.disabled}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white">
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {option.label}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>

        {description && !error && (
          <Description className="mt-2 text-sm font-light text-gray-500">
            {description}
          </Description>
        )}
        {error && (
          <Description className="mt-2 text-sm font-light text-red-600">
            {error}
          </Description>
        )}
      </Field>
    );
  },
);
