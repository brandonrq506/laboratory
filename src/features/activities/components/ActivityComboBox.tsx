import { useActivities } from "../api/tanstack/useActivities";

import { FieldValues, UseControllerProps } from "react-hook-form";
import { ComboBoxType } from "@/components/form/ComboBox/types";
import { ControlComboBox } from "@/components/form";
import { transformToOption } from "@/utils";

type ActivityComboBoxProps = Omit<ComboBoxType, "options" | "label">;

export const ActivityComboBox = <T extends FieldValues>({
  description,
  hideLabel,
  showAsterisk,
  ...controllerProps
}: UseControllerProps<T> & ActivityComboBoxProps) => {
  const { data } = useActivities();

  const options = data?.map((c) => transformToOption(c, "id", "name")) ?? [];

  return (
    <ControlComboBox
      description={description}
      hideLabel={hideLabel}
      label="Activities"
      options={options}
      showAsterisk={showAsterisk}
      {...controllerProps}
    />
  );
};
