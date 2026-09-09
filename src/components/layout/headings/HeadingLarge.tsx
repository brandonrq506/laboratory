import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
  description?: string;
};

export const HeadingLarge = ({ className, title, description }: Props) => {
  return (
    <div className={clsx("", className)}>
      <h1 className="text-foreground text-2xl/7 font-bold sm:text-3xl sm:tracking-tight">
        {title}
      </h1>
      {description && <p className="text-foreground-subtle">{description}</p>}
    </div>
  );
};
