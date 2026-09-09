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
        "border-border mb-1 flex h-9 items-center justify-between border-b",
        className,
      )}>
      <h3 className="text-foreground text-base font-semibold">{title}</h3>
      <div className="flex items-center justify-center">{action}</div>
    </div>
  );
};
