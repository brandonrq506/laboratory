import clsx from "clsx";

const variants = {
  primary: "bg-primary text-primary-foreground shadow-xs",
  primaryOutline: "bg-transparent text-primary-text",
  danger: "bg-danger text-danger-foreground shadow-xs",
  dangerOutline: "bg-transparent text-danger-text",
  blackOutline: "bg-transparent text-foreground-strong",
};

const states = {
  primary: "hover:bg-primary-hover focus-visible:ring-primary-text",
  primaryOutline:
    "hover:text-primary-text-hover focus-visible:ring-primary-text",
  danger: "hover:bg-danger-hover focus-visible:ring-danger-text",
  dangerOutline: "hover:text-danger-text-hover focus-visible:ring-danger-text",
  blackOutline:
    "hover:text-foreground-subtle focus-visible:ring-foreground-strong",
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
  ref?: React.Ref<HTMLButtonElement>;
};

export const IconButton = ({
  ref,
  size = "md",
  shape = "none",
  variant = "primaryOutline",
  className,
  children,
  ...props
}: IconButtonProps) => {
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
