import { Button as HButton } from "@headlessui/react";
import { Loading } from "../Loading/Loading";
import clsx from "clsx";
import { forwardRef } from "react";

const sizes = {
  sm: "px-2 py-1 text-sm rounded",
  md: "px-2.5 py-1.5 text-sm rounded-md",
  lg: "px-3 py-2 text-sm rounded-md",
  xl: "px-3.5 py-2.5 text-sm rounded-md",
};

const variants = {
  primary:
    "bg-blue-600 text-white data-[hover]:bg-blue-500 data-[focus]:bg-blue-500",
  secondary:
    "bg-white text-blue-600 data-[hover]:bg-gray-100 data-[focus]:bg-gray-100 border border-gray-200",
  danger:
    "bg-red-600 text-white data-[hover]:bg-red-500 data-[focus]:bg-red-500",
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
      className = "",
      type = "button",
      variant = "primary",
      size = "md",
      isLoading = false,
      endIcon,
      startIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <HButton
        ref={ref}
        type={type}
        className={clsx(
          "inline-flex items-center font-semibold shadow-sm",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
          "data-[focus]:outline-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}>
        {isLoading && <Loading />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </HButton>
    );
  },
);
