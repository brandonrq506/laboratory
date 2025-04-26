import { Link, useSearchParams } from "react-router";
import { RectangleStackIcon } from "@heroicons/react/24/outline";

export const HistoryLink = () => {
  const [params] = useSearchParams();

  const date = params.get("date") ?? "";

  return (
    <Link to={{ pathname: "/history", search: date && `?date=${date}` }}>
      <RectangleStackIcon className="size-5" />
    </Link>
  );
};
