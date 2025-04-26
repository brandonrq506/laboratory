import { AdminProtectedContent } from "@/features/user/components";
import { DateFilter } from "@/components/core/Date";
import { ExcelPageContent } from "./ExcelPageContent";
import { HistoryLink } from "./HistoryLink";
import { PageHeaderWithActions } from "@/components/layout";

export const ExcelPage = () => {
  return (
    <div>
      <PageHeaderWithActions
        title="Excel Exporter"
        actions={
          <AdminProtectedContent>
            <HistoryLink />
          </AdminProtectedContent>
        }
      />
      <DateFilter label="Date" hideLabel className="sm:w-1/2" />
      <ExcelPageContent />
    </div>
  );
};
