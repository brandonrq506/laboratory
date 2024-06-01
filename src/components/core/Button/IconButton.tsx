import clsx from "clsx";
import { forwardRef } from "react";

const variants = {
  primary: "bg-blue-600 text-white shadow-sm",
  primaryOutline: "bg-transparent text-blue-600",
  danger: "bg-red-600 text-white shadow-sm",
  dangerOutline: "bg-transparent text-red-600",
  blackOutline: "bg-transparent text-black",
};

const states = {
  primary: "hover:bg-blue-500 focus-visible:outline-blue-600",
  primaryOutline: "hover:text-blue-500 focus-visible:outline-blue-600",
  danger: "hover:bg-red-500 focus-visible:outline-red-600",
  dangerOutline: "hover:text-red-500 focus-visible:outline-red-600",
  blackOutline: "hover:text-gray-500 focus-visible:outline-black",
};

const shapes = {
  circle: "rounded-full",
  square: "rounded",
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

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "md",
      shape = "none",
      variant = "primaryOutline",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          sizes[size],
          shapes[shape],
          variants[variant],
          states[variant],
          className,
        )}
        {...props}>
        {props.children}
      </button>
    );
  },
);
