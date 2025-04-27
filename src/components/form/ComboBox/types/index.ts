import { Option } from "@/types/core";

type BaseConfig = { text: string };
type PersistentConfig = { isPersistent: true; showFirst: boolean };
type NonPersistentConfig = { isPersistent?: false; showFirst?: false };
export type Configuration = BaseConfig &
  (PersistentConfig | NonPersistentConfig);

export type ComboBoxType = {
  options: Option[];
  label: string;
  config?: Configuration;
  description?: string;
  hideErrorMessage?: boolean;
  hideLabel?: boolean;
  showAsterisk?: boolean;
};
