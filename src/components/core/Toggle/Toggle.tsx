import { Description, Field, Label, Switch } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  description: string;
  label: string;

  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle = ({
  description,
  checked,
  className,
  label,
  onChange,
}: Props) => {
  return (
    <Field className={clsx("flex items-center justify-between", className)}>
      <span className="flex grow flex-col">
        <Label
          as="span"
          passive
          className="text-sm/6 font-medium text-gray-900">
          {label}
        </Label>
        <Description as="span" className="text-sm font-light text-gray-500">
          {description}
        </Description>
      </span>
      <Switch
        checked={checked}
        onChange={onChange}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none data-[checked]:bg-indigo-600">
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
    </Field>
  );
};
