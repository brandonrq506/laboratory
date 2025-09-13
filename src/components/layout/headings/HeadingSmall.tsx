import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
  description?: string;
};

export const HeadingSmall = ({ className, title, description }: Props) => {
  return (
    <div className={clsx("", className)}>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
};
