import { useNavigate } from "@tanstack/react-router";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { addDays, format, parseISO } from "date-fns";
import { DateInput } from "./DateInput";
import { IconButton } from "../Button/IconButton";
import { InputProps } from "@headlessui/react";

type DateField = Omit<InputProps, "onChange" | "value" | "max" | "type">;

type Props = DateField & {
  className?: string;
  description?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  showAsterisk?: boolean;
  label: string;
  value: string;
};

export const DateFilter = ({
  className,
  description,
  hideLabel = false,
  inputClassName,
  showAsterisk = false,
  label,
  value,
}: Props) => {
  const navigate = useNavigate();

  const shiftDate = (delta: number) => {
    const newDateObj = addDays(parseISO(value), delta);

    navigate({ to: ".", search: { date: format(newDateObj, "yyyy-MM-dd") } });
  };

  return (
    <div className="flex items-center space-x-2">
      <IconButton
        aria-label="Previous date"
        onClick={() => shiftDate(-1)}
        variant="blackOutline">
        <ChevronLeftIcon className="size-5" />
      </IconButton>
      <DateInput
        className={className}
        description={description}
        hideLabel={hideLabel}
        inputClassName={inputClassName}
        label={label}
        onChange={(e) => {
          const inputValue = e.target.value;

          navigate({ to: ".", search: { date: inputValue } });
        }}
        showAsterisk={showAsterisk}
        value={value}
      />
      <IconButton
        aria-label="Next date"
        onClick={() => shiftDate(1)}
        variant="blackOutline"
        className="disabled:text-gray-600">
        <ChevronRightIcon className="size-5" />
      </IconButton>
    </div>
  );
};
