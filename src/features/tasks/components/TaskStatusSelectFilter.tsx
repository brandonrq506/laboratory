import { useSearchParams } from "react-router";

import { StringSelect } from "@/components/form";
import { TaskStatus } from "../types/task-status";

import { StringOption } from "@/types/core";

type test = { value: TaskStatus; label: string };

const status: test[] = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const defaultOptionValue = "all";
const defaultOption: StringOption = { value: defaultOptionValue, label: "All" };

export const TaskStatusSelectFilter = () => {
  const [params, setParams] = useSearchParams({
    status: "all",
  });

  const param = params.get("status") ?? defaultOptionValue;
  const options = [defaultOption, ...status];

  const selectedOption = options.find((o) => o.value === param) ?? null;

  return (
    <StringSelect
      name="status"
      label="Status"
      options={options}
      value={selectedOption}
      onBlur={() => {}}
      onChange={({ value }) => {
        setParams(
          (prev) => {
            if (value === defaultOptionValue) {
              prev.delete("status");
              return prev;
            }

            prev.set("status", value);
            return prev;
          },
          { replace: true },
        );
      }}
    />
  );
};
