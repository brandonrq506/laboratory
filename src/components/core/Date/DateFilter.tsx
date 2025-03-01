import { useSearchParams } from "react-router";

import {
  Description,
  Field,
  Input,
  InputProps,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

const today = new Date().toISOString().split("T")[0];

type DateField = Omit<InputProps, "onChange" | "value" | "max">;

type Props = DateField & {
  className?: string;
  description?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  showAsterisk?: boolean;
  label: string;
};

/*
To Do: This could be broken down into a DateInput component and a DateFilter component
The DateInput uses InputProps without Omit
The DateFilter Omits those that it will use like value and onChange.
Then we could have DateInput for RHF that omits onChange, onBlur, name, etc.
*/
export const DateFilter = ({
  className,
  description,
  hideLabel = false,
  inputClassName,
  showAsterisk = false,
  label,
}: Props) => {
  const [params, setParams] = useSearchParams({
    date: today,
  });

  const date = params.get("date") ?? today;

  return (
    <Field className={className}>
      <Label
        className={clsx(
          "block text-sm leading-6 font-medium text-gray-900",
          hideLabel && "sr-only",
        )}>
        {label} {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Label>
      <Input
        type="date"
        value={date}
        onChange={(e) => setParams({ date: e.target.value })}
        max={today}
        className={clsx(
          "mt-2 block w-full rounded-md border-0 py-1.5 text-sm font-light text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 sm:leading-6",
          "data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-inset",
          "data-disabled:cursor-not-allowed data-disabled:bg-gray-50 data-disabled:text-gray-500 data-disabled:ring-gray-200",
          "data-invalid:text-red-900 data-invalid:ring-red-300 data-invalid:placeholder:text-red-300 data-invalid:focus:ring-red-500",
          inputClassName,
        )}
      />
      {description && (
        <Description className="mt-2 text-sm font-light text-gray-500">
          {description}
        </Description>
      )}
    </Field>
  );
};
