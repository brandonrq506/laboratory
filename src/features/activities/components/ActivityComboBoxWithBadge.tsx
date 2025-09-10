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

export const ActivityComboBoxWithBadge = <T extends FieldValues>({
  description,
  hideLabel,
  showAsterisk,
  hideErrorMessage,
  ...controllerProps
}: UseControllerProps<T> & ActivityComboBoxWithBadgeProps) => {
  const { data } = useActivities();
  const { field, fieldState } = useController(controllerProps);

  // Transform activities to enhanced options with category data
  const options: EnhancedOption[] =
    data?.map((activity) => ({
      value: activity.id,
      label: activity.display_name,
      disabled: false,
      // Store the full activity object for rendering
      data: activity,
    })) ?? [];

  const renderOption = (option: EnhancedOption) => {
    /*
    Extract activity data from the option.
    We know this is an ActivityAPI because we created the options.
    */
    const activity = option.data as ActivityAPI;
    const color = getColorByName(activity.category.color);

    if (!activity?.category) {
      return <span>{option.label}</span>;
    }

    // return <Badge color={activity.category.color}>{option.label}</Badge>;
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
