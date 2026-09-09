import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import type { SortDirection } from "@tanstack/react-table";

type Props = {
  sortDirection: SortDirection | false;
  canSort: boolean;
};

export const SortIcon = ({ sortDirection, canSort }: Props) => {
  if (!canSort) return null;
  if (sortDirection === false)
    return (
      <ChevronUpDownIcon aria-hidden className="text-foreground-faint size-5" />
    );
  if (sortDirection === "asc")
    return (
      <ChevronUpIcon
        aria-hidden
        className="text-foreground-faint m-1 size-3 stroke-2"
      />
    );
  return (
    <ChevronDownIcon
      aria-hidden
      className="text-foreground-faint m-1 size-3 stroke-2"
    />
  );
};
