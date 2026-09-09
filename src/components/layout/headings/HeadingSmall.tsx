import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
  description?: string;
};

export const HeadingSmall = ({ className, title, description }: Props) => {
  return (
    <div className={clsx("", className)}>
      <h3 className="text-foreground text-lg font-bold">{title}</h3>
      {description && <p className="text-foreground-subtle">{description}</p>}
    </div>
  );
};
