import { Link, type LinkProps } from "@tanstack/react-router";
import clsx from "clsx";

const sizes = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-2.5 py-1.5 text-sm rounded-md",
  lg: "px-3 py-2 text-sm rounded-md",
  xl: "px-3.5 py-2.5 text-sm rounded-md",
};

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary-text",
  secondary:
    "bg-surface text-primary-text hover:bg-surface-hover focus-visible:outline-border border border-border",
  danger:
    "bg-danger text-danger-foreground hover:bg-danger-hover focus-visible:outline-danger-text",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & IconProps;

type OtherProps = {
  children: React.ReactNode;
  className?: string;
};

type Props = StyleProps & LinkProps & OtherProps;

export const ResponsiveLinkButton = ({
  size = "md",
  variant = "primary",
  className,
  endIcon,
  startIcon,
  ...props
}: Props) => {
  return (
    <Link
      {...props}
      className={clsx(
        "inline-flex items-center font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        sizes[size],
        className,
      )}>
      {startIcon}
      <span className="sr-only mx-2 sm:not-sr-only">{props.children}</span>
      {endIcon}
    </Link>
  );
};
