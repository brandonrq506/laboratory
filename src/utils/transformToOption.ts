import { Option } from "@/types/core";

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export function transformToOption<T>(
  obj: T,
  valueKey: NumberKeys<T>,
  labelKey: StringKeys<T>,
  disabledKey?: keyof T,
): Option {
  return {
    value: obj[valueKey] as number,
    label: obj[labelKey] as string,
    disabled: disabledKey ? Boolean(obj[disabledKey]) : false,
  };
}
