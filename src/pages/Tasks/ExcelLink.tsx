import { Link, useSearchParams } from "react-router";
import { TableCellsIcon } from "@heroicons/react/24/outline";

export const ExcelLink = () => {
  const [params] = useSearchParams();

  const date = params.get("date") ?? undefined;

  return (
    <Link to={{ pathname: "/excel", search: date && `?date=${date}` }}>
      <TableCellsIcon className="size-5" />
    </Link>
  );
};
