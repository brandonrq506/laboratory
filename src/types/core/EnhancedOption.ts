import { Option } from "./option";

export interface EnhancedOption<T = unknown> extends Option {
  /** Original data object for accessing additional properties */
  data?: T;
}
