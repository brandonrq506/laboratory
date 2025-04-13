import clsx from "clsx";
import { getColorByName } from "@/features/colors/utils/getColorByName";

interface Props {
  color: string;
  children: React.ReactNode;
}

export const Badge = ({ color, children }: Props) => {
  const safeColor = getColorByName(color);

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        safeColor.bgClass,
        safeColor.textClass,
        safeColor.borderClass,
      )}>
      {children}
    </span>
  );
};
