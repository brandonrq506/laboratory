import { notFound } from "@tanstack/react-router";

type NumMap<K extends string> = { [P in K]: number };
type StrMap<K extends string> = { [P in K]: string };

export function validateIdParam<K extends string>(key: K) {
  return {
    parse: (raw: StrMap<K>): NumMap<K> => {
      const n = Number(raw[key]);
      if (!Number.isSafeInteger(n) || n <= 0) throw notFound();
      return { [key]: n } as NumMap<K>;
    },
    stringify: (p: NumMap<K>): StrMap<K> => {
      return { [key]: String(p[key]) } as StrMap<K>;
    },
  };
}
