import { Category } from "@/features/categories/types/category";
import { ExcelTableRow } from "../types/excelTableRow";

export const calculatePercentageByCategory = (
  data: ExcelTableRow[],
  user_categories: Category[] | undefined,
) => {
  if (!user_categories) {
    return [];
  }
  const categoryMap = new Map<Category, number>();

  for (const { category, percentage } of data) {
    const foundCategory = user_categories.find((c) => c.name === category);
    if (foundCategory) {
      const currentPercentage = categoryMap.get(foundCategory) ?? 0;
      categoryMap.set(foundCategory, currentPercentage + percentage);
    }
  }

  return Array.from(categoryMap.entries());
};
