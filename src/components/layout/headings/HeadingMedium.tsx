import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
  description?: string;
};

export const HeadingMedium = ({ className, title, description }: Props) => {
  return (
    <div className={clsx("", className)}>
      <h2 className="text-foreground text-xl font-bold sm:text-2xl">{title}</h2>
      {description && <p className="text-foreground-subtle">{description}</p>}
    </div>
  );
};
