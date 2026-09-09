import {
  Description,
  Field,
  Input,
  type InputProps,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

type CustomProps = {
  className?: string;
  description?: string;
  hideLabel?: boolean;
  label: string;
  showAsterisk?: boolean;
  inputClassName?: string;
};

type Props = CustomProps & Omit<InputProps, "type">;

export const DateInput = ({
  className,
  description,
  hideLabel,
  inputClassName,
  label,
  showAsterisk,
  ...inputProps
}: Props) => {
  return (
    <Field className={className}>
      <Label
        className={clsx(
          "text-foreground block text-sm leading-6 font-medium",
          hideLabel && "sr-only",
        )}>
        {label}{" "}
        {showAsterisk && <span className="text-danger-strong ml-1">*</span>}
      </Label>
      <Input
        type="date"
        className={clsx(
          "bg-surface text-foreground ring-input-border placeholder:text-foreground-faint block w-full rounded-md border-0 py-1.5 text-sm font-light shadow-xs ring-1 ring-inset sm:leading-6",
          "data-focus:ring-focus-ring data-focus:ring-2 data-focus:ring-inset",
          "data-disabled:bg-surface-subtle data-disabled:text-foreground-subtle data-disabled:ring-border data-disabled:cursor-not-allowed",
          "data-invalid:text-invalid-text data-invalid:ring-invalid-border data-invalid:placeholder:text-invalid-placeholder data-invalid:focus:ring-danger-ring",
          !hideLabel && "mt-2",
          inputClassName,
        )}
        {...inputProps}
      />
      {description && (
        <Description className="text-foreground-subtle mt-2 text-sm font-light">
          {description}
        </Description>
      )}
    </Field>
  );
};
