import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
  description?: string;
};

export const HeadingMedium = ({ className, title, description }: Props) => {
  return (
    <div className={clsx("", className)}>
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
};
