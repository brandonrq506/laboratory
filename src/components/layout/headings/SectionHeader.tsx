import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
};

export const SectionHeader = ({ className, title }: Props) => {
  return (
    <div
      className={clsx(
        "mb-1 flex h-9 items-center justify-between border-b border-gray-200",
        className,
      )}>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    </div>
  );
};
