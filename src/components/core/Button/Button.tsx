import clsx from "clsx";
import { forwardRef } from "react";

const sizes = {
  xs: "px-2 py-1 text-xs rounded",
  sm: "px-2 py-1 text-sm rounded",
  md: "px-2.5 py-1.5 text-sm rounded-md",
  lg: "px-3 py-2 text-sm rounded-md",
  xl: "px-3.5 py-2.5 text-sm rounded-md",
};

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600",
  secondary:
    "bg-white text-blue-600 hover:bg-gray-100 focus-visible:outline-gray-200 border border-gray-200",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
  info: "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "inline-flex items-center font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  },
);
