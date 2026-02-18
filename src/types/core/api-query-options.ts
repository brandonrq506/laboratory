import { SortParams } from "./sortParams";

export type ApiQueryOptions<T> = {
  filter?: T;
  sort?: Partial<SortParams>;
};
