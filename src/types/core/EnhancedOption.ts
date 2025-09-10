import { Option } from "./option";

export interface EnhancedOption<T = unknown> extends Option {
  data: T;
}
