import { Link, getRouteApi } from "@tanstack/react-router";
import { RectangleStackIcon } from "@heroicons/react/24/outline";

const routeApi = getRouteApi("/__protected/excel");

export const HistoryLink = () => {
  const { date } = routeApi.useSearch();

  return (
    <Link to="/history" search={{ date }} className="flex items-center">
      <RectangleStackIcon className="size-5" />
    </Link>
  );
};
