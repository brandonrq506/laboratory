import { Link, LinkProps } from "react-router";
import clsx from "clsx";

const sizes = {
  sm: "px-2 py-1 text-sm rounded-sm",
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
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & IconProps;

type Props = StyleProps & LinkProps;

export const LinkButton = ({
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
      <span className="mx-2">{props.children}</span>
      {endIcon}
    </Link>
  );
};
