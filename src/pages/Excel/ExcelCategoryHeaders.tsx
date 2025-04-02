import { useCategories } from "@/features/categories/api/tanstack/useCategories";

import { CategoryBadge } from "@/features/categories/components";
import { ExcelTable } from "@/features/excel/types/excelTable";
import { calculatePercentageByCategory } from "@/features/excel/utils/caculatePercentageByCategory";

const HUNDREDTH = 100;
const PRECISION = 4;

type Props = {
  excelData: ExcelTable[];
};

export const ExcelCategoryHeaders = ({ excelData }: Props) => {
  const { data } = useCategories();
  const result = calculatePercentageByCategory(excelData, data);

  return (
    <div className="mt-4 flex flex-wrap gap-x-6">
      {result.map(([category, percentage]) => (
        <div key={category.id} className="my-1 flex items-center gap-2">
          <CategoryBadge category={category} />
          <p className="text-sm font-light">
            {(percentage * HUNDREDTH).toPrecision(PRECISION)}%
          </p>
        </div>
      ))}
    </div>
  );
};
