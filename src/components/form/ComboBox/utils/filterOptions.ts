import { Option } from "@/types/core";

export const filterOptions = (query: string, options: Option[]) => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return options;

  const matches = options.filter((op) =>
    op.label.toLowerCase().includes(trimmed),
  );

  if (matches.length === 0) return [];

  const exact = matches.filter((op) => op.label.toLowerCase() === trimmed);
  const partial = matches.filter((op) => op.label.toLowerCase() !== trimmed);

  return [...exact, ...partial];
};
