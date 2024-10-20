import { Option } from "@/types/core";

export type SelectType = {
  description?: string;
  label: string;
  options: Option[];
  showAsterisk?: boolean;
};
