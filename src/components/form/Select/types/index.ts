import { Option, StringOption } from "@/types/core";

export type SelectType = {
  description?: string;
  label: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  options: Option[];
  showAsterisk?: boolean;
};

export type StringSelectType = {
  description?: string;
  label: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  options: StringOption[];
  showAsterisk?: boolean;
};
