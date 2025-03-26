import { DateFilter } from "@/components/core/Date";
import { ExcelPageContent } from "./ExcelPageContent";
import { PageHeader } from "@/components/layout";

export const ExcelPage = () => {
  return (
    <div>
      <PageHeader title="Excel Exporter" />
      <DateFilter label="Date" hideLabel className="sm:w-1/2" />
      <ExcelPageContent />
    </div>
  );
};
