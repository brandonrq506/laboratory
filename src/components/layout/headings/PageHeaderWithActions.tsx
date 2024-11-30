import { clsx } from "clsx";

type Props = {
  actions: React.ReactNode;
  className?: string;
  title: string;
};

export const PageHeaderWithActions = ({ actions, className, title }: Props) => {
  return (
    <div className={clsx("flex items-center justify-between", className)}>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="flex content-center gap-3">{actions}</div>
    </div>
  );
};
