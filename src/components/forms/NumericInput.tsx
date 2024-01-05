import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
};

export const NumericInput = ({ registration, className, ...props }: Props) => {
  return (
    <input
      type="number"
      inputMode="numeric"
      className={clsx("", className)}
      {...props}
      {...registration}
    />
  );
};
