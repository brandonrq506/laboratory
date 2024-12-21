import { Option, StringOption } from "@/types/core";

export type SelectType = {
  description?: string;
  label: string;
  options: Option[];
  showAsterisk?: boolean;
};

export type StringSelectType = {
  description?: string;
  label: string;
  options: StringOption[];
  showAsterisk?: boolean;
};
