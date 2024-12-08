import { clsx } from "clsx";

type Props = {
  action: React.ReactNode;
  className?: string;
  title: string;
};

export const SectionHeaderWithAction = ({
  action,
  className,
  title,
}: Props) => {
  return (
    <div
      className={clsx(
        "mb-1 flex items-center justify-between border-b border-gray-200 pb-2.5",
        className,
      )}>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div>{action}</div>
    </div>
  );
};
