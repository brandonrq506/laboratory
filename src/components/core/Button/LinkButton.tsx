import { Link } from "react-router-dom";
import { Button } from "./Button";

type LinkButtonProps = React.ComponentProps<typeof Button> & {
  to: string;
};

export const LinkButton = ({ to, ...props }: LinkButtonProps) => {
  return (
    <Link to={to} className="w-full">
      <Button {...props}>{props.children}</Button>
    </Link>
  );
};
