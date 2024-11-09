import { FieldValues, UseControllerProps } from "react-hook-form";
import { ControlledSelect } from "@/components/form";
import { colors } from "../utils/colorObjects";
import { transformToOption } from "@/utils";

export const ColorSelect = <T extends FieldValues>({
  ...controllerProps
}: UseControllerProps<T>) => {
  const options = colors.map((c) => transformToOption(c, "id", "name"));

  return (
    <ControlledSelect options={options} label="Color" {...controllerProps} />
  );
};
