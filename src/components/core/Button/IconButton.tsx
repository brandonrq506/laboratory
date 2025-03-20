import clsx from "clsx";

const variants = {
  primary: "bg-blue-600 text-white shadow-xs",
  primaryOutline: "bg-transparent text-blue-600",
  danger: "bg-red-600 text-white shadow-xs",
  dangerOutline: "bg-transparent text-red-600",
  blackOutline: "bg-transparent text-black",
};

const states = {
  primary: "hover:bg-blue-500 focus-visible:ring-blue-600",
  primaryOutline: "hover:text-blue-500 focus-visible:ring-blue-600",
  danger: "hover:bg-red-500 focus-visible:ring-red-600",
  dangerOutline: "hover:text-red-500 focus-visible:ring-red-600",
  blackOutline: "hover:text-gray-500 focus-visible:ring-black",
};

const shapes = {
  circle: "rounded-full",
  square: "rounded-sm",
  none: "",
};

const sizes = {
  xs: "p-0",
  sm: "p-1",
  md: "p-1.5",
  lg: "p-2",
};

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizes;
  shape?: keyof typeof shapes;
  variant?: keyof typeof variants;
  className?: string;
};

export const IconButton = ({
  ref,
  size = "md",
  shape = "none",
  variant = "primaryOutline",
  className,
  children,
  ...props
}: IconButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>;
}) => {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "border-none ring-2 ring-transparent ring-offset-0 outline-hidden transition focus-visible:ring-offset-4",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
        sizes[size],
        shapes[shape],
        variants[variant],
        states[variant],
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
