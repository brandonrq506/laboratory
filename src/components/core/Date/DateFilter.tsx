import { useSearchParams } from "react-router";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DateInput } from "./DateInput";
import { IconButton } from "../Button/IconButton";
import { InputProps } from "@headlessui/react";

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
const today = now.toISOString().split("T")[0];

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
    date: today,
  });

  const date = params.get("date") ?? today;

  const handlePrevious = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    const newDate = currentDate.toISOString().split("T")[0];
    setParams({ date: newDate });
  };

  const handleNext = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    const newDate = currentDate.toISOString().split("T")[0];
    if (newDate <= today) {
      setParams({ date: newDate });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <IconButton onClick={handlePrevious} variant="blackOutline">
        <ChevronLeftIcon className="size-5" />
      </IconButton>
      <DateInput
        className={className}
        description={description}
        hideLabel={hideLabel}
        inputClassName={inputClassName}
        label={label}
        max={today}
        onChange={(e) => setParams({ date: e.target.value })}
        showAsterisk={showAsterisk}
        value={date}
      />
      <IconButton
        onClick={handleNext}
        disabled={date === today}
        variant="blackOutline"
        className="disabled:text-gray-600">
        <ChevronRightIcon className="size-5" />
      </IconButton>
    </div>
  );
};
