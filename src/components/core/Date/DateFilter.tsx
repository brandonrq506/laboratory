import { useSearchParams } from "react-router";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { addDays, format, isAfter, isToday, parseISO } from "date-fns";
import { DateInput } from "./DateInput";
import { IconButton } from "../Button/IconButton";
import { InputProps } from "@headlessui/react";

const today = () => format(new Date(), "yyyy-MM-dd");

type DateField = Omit<InputProps, "onChange" | "value" | "max" | "type">;

type Props = DateField & {
  className?: string;
  description?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  showAsterisk?: boolean;
  label: string;
};

export const DateFilter = ({
  className,
  description,
  hideLabel = false,
  inputClassName,
  showAsterisk = false,
  label,
}: Props) => {
  const [params, setParams] = useSearchParams({
    date: today(),
  });

  const date = params.get("date") ?? today();

  const shiftDate = (delta: number) => {
    const newDateObj = addDays(parseISO(date), delta);
    if (isAfter(newDateObj, new Date())) return;

    setParams({ date: format(newDateObj, "yyyy-MM-dd") });
  };

  return (
    <div className="flex items-center space-x-2">
      <IconButton onClick={() => shiftDate(-1)} variant="blackOutline">
        <ChevronLeftIcon className="size-5" />
      </IconButton>
      <DateInput
        className={className}
        description={description}
        hideLabel={hideLabel}
        inputClassName={inputClassName}
        label={label}
        max={today()}
        onChange={(e) => setParams({ date: e.target.value })}
        showAsterisk={showAsterisk}
        value={date}
      />
      <IconButton
        onClick={() => shiftDate(1)}
        disabled={isToday(parseISO(date))}
        variant="blackOutline"
        className="disabled:text-gray-600">
        <ChevronRightIcon className="size-5" />
      </IconButton>
    </div>
  );
};
