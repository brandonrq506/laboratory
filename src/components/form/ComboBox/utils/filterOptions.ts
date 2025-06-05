import { Option } from "@/types/core";

export const filterOptions = (query: string, options: Option[]) => {
  const trimmedQuery = query.trim().toLowerCase();
  const startsWithMatches: Option[] = [];
  const includesMatches = new Map<string, Option>();

  for (const option of options) {
    const label = option.label.toLowerCase();
    const key = option.value.toString();

    if (label.startsWith(trimmedQuery)) {
      startsWithMatches.push(option);
    } else if (label.includes(trimmedQuery)) {
      includesMatches.set(key, option);
    }
  }

  const startsWithKeys = new Set(
    startsWithMatches.map((op) => op.value.toString()),
  );
  const filteredIncludes = Array.from(includesMatches.entries())
    .filter(([key]) => !startsWithKeys.has(key))
    .map(([, option]) => option);

  return [...startsWithMatches, ...filteredIncludes];
};
