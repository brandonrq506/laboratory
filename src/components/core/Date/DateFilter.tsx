import { useSearchParams } from "react-router";

import { DateInput } from "./DateInput";
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

  return (
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
  );
};
