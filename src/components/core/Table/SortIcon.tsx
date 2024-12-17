import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import { SortDirection } from "@tanstack/react-table";

type Props = {
  sortDirection: SortDirection | false;
  canSort: boolean;
};

export const SortIcon = ({ sortDirection, canSort }: Props) => {
  if (!canSort) return null;
  if (sortDirection === false)
    return <ChevronUpDownIcon aria-hidden className="size-5 text-gray-400" />;
  if (sortDirection === "asc")
    return (
      <ChevronUpIcon
        aria-hidden
        className="m-1 size-3 stroke-2 text-gray-400"
      />
    );
  return (
    <ChevronDownIcon
      aria-hidden
      className="m-1 size-3 stroke-2 text-gray-400"
    />
  );
};
