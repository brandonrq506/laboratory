import { useActivities } from "../api/tanstack/useActivities";

import { FieldValues, UseControllerProps } from "react-hook-form";
import { ControlComboBox } from "@/components/form";
import { transformToOption } from "@/utils";

export const ActivityComboBox = <T extends FieldValues>({
  ...controllerProps
}: UseControllerProps<T>) => {
  const { data } = useActivities();

  const options = data?.map((c) => transformToOption(c, "id", "name")) ?? [];

  return (
    <ControlComboBox
      label="Activities"
      options={options}
      {...controllerProps}
    />
  );
};
