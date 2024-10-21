import { useCategories } from "../api/tanstack/useCategories";

import { FieldValues, UseControllerProps } from "react-hook-form";
import { ControlledSelect } from "@/components/form";
import { transformToOption } from "@/utils";

export const CategorySelect = <T extends FieldValues>({
  ...controllerProps
}: UseControllerProps<T>) => {
  const { data } = useCategories();
  const options = data?.map((c) => transformToOption(c, "id", "name")) ?? [];

  return (
    <ControlledSelect
      options={options}
      label="Category"
      showAsterisk
      {...controllerProps}
    />
  );
};
