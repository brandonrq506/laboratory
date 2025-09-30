import { useQuery } from "@tanstack/react-query";

import { FieldValues, UseControllerProps } from "react-hook-form";
import { ControlledSelect } from "@/components/form";
import { categoryListQueryOptions } from "../api/queries";
import { transformToOption } from "@/utils";

export const CategorySelect = <T extends FieldValues>({
  ...controllerProps
}: UseControllerProps<T>) => {
  const { data } = useQuery(categoryListQueryOptions());
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
