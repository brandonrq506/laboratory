import { Option } from "@/types/core";

export type ComboBoxType = {
  options: Option[];
  label: string;
  description?: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  showAsterisk?: boolean;
};
