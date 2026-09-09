import { Button as HButton } from "@headlessui/react";
import { Loading } from "../Loading/Loading";
import clsx from "clsx";

const sizes = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-2.5 py-1.5 text-sm rounded-md",
  lg: "px-3 py-2 text-sm rounded-md",
  xl: "px-3.5 py-2.5 text-sm rounded-md",
};

const variants = {
  primary:
    "bg-primary text-primary-foreground data-hover:bg-primary-hover data-focus:bg-primary-hover",
  secondary:
    "bg-surface text-primary-text data-hover:bg-surface-hover data-focus:bg-surface-hover border border-border",
  danger:
    "bg-danger text-danger-foreground data-hover:bg-danger-hover data-focus:bg-danger-hover",
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

export const Button = ({
  ref,
  className = "",
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  endIcon,
  startIcon,
  ...props
}: ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <HButton
      ref={ref}
      type={type}
      className={clsx(
        "inline-flex items-center font-semibold shadow-xs",
        "data-disabled:cursor-not-allowed data-disabled:opacity-75",
        "data-focus:outline-hidden",
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
};
