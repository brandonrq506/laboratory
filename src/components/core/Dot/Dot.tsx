import { clsx } from "clsx";

type Props = {
  className?: string;
  sizeStyles?: string;
  colorStyles?: string;
};

export const Dot = ({
  className,
  sizeStyles = "size-5",
  colorStyles = "fill-red-500",
}: Props) => {
  return (
    <svg
      viewBox="0 0 6 6"
      aria-hidden="true"
      className={clsx(className, sizeStyles, colorStyles)}>
      <circle r={3} cx={3} cy={3} />
    </svg>
  );
};
