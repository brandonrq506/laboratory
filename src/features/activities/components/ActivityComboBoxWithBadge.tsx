import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useActivities } from "../api/tanstack/useActivities";

import { ActivityAPI } from "../types/activityAPI";
import { ComboBoxType } from "@/components/form/ComboBox/types";
import { ComboBoxWithRenderer } from "@/components/form";
import { Dot } from "@/components/core";
import { EnhancedOption } from "@/types/core";
import { getColorByName } from "@/features/colors/utils/getColorByName";

type ActivityComboBoxWithBadgeProps = Omit<ComboBoxType, "options" | "label">;

/*
  It may be tempting to create a more generic version of this component that accepts a `renderOption` prop. However, that means that the options conversion must also be done outside.
  While that would work and the ideal use-case is to have `renderBadgeOptions` and `transformToBadgeOptions` utilities to minimize boilerplate further up, the current approach is good enough for what is likely to be a one-off.
*/

export const ActivityComboBoxWithBadge = <T extends FieldValues>({
  description,
  hideLabel,
  showAsterisk,
  hideErrorMessage,
  ...controllerProps
}: UseControllerProps<T> & ActivityComboBoxWithBadgeProps) => {
  const { data } = useActivities();
  const { field, fieldState } = useController(controllerProps);

  const options = (data ?? []).map((activity) => ({
    value: activity.id,
    label: activity.display_name,
    disabled: false,
    data: activity,
  })) satisfies EnhancedOption<ActivityAPI>[];

  const renderOption = (option: EnhancedOption<ActivityAPI>) => {
    const activity = option.data;
    const color = getColorByName(activity.category.color);

    return (
      <div className="flex items-center gap-2">
        <Dot colorStyles={color.fillClass} sizeStyles="size-2" />
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <ComboBoxWithRenderer
      description={description}
      hideErrorMessage={hideErrorMessage}
      hideLabel={hideLabel}
      label="Activities"
      options={options}
      showAsterisk={showAsterisk}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      ref={field.ref}
      error={fieldState.error?.message}
      renderOption={renderOption}
    />
  );
};
