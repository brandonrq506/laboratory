import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return (
    <div className={clsx("rounded-md bg-white px-4 py-3 shadow-sm", className)}>
      {children}
    </div>
  );
};
