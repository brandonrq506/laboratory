import { useQuery } from "@tanstack/react-query";

import { CategoryBadge } from "@/features/categories/components";
import { ExcelTableRow } from "@/features/excel/types/excelTableRow";
import { calculatePercentageByCategory } from "@/features/excel/utils/calculatePercentageByCategory";
import { categoryListQueryOptions } from "@/features/categories/api/queries";

const HUNDREDTH = 100;
const PRECISION = 4;

type Props = {
  excelData: ExcelTableRow[];
};

export const ExcelCategoryHeaders = ({ excelData }: Props) => {
  const { data } = useQuery(categoryListQueryOptions());
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
