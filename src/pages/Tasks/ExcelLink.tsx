import { Link, getRouteApi } from "@tanstack/react-router";
import { TableCellsIcon } from "@heroicons/react/24/outline";

const routeApi = getRouteApi("/__protected/history");

export const ExcelLink = () => {
  const { date } = routeApi.useSearch();

  return (
    <Link to="/excel" search={{ date }} className="flex items-center">
      <TableCellsIcon className="size-5" />
    </Link>
  );
};
