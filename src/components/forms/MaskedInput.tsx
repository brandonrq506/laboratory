import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
};

export const MaskedInput = ({ registration, className, ...props }: Props) => {
  return (
    <input
      type="tel"
      inputMode="numeric"
      className={clsx("", className)}
      {...registration}
      {...props}
    />
  );
};
