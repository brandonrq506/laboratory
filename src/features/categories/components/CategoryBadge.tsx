import { Category } from "../types/category";

import { clsx } from "clsx";
import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = {
  category: Category;
};

export const CategoryBadge = ({ category }: Props) => {
  const color = getColorByName(category.color);

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        color.bgClass,
        color.textClass,
        color.borderClass,
      )}>
      {category.name}
    </span>
  );
};
