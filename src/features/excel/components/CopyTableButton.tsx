import { ExcelTableRow } from "../types/excelTableRow";
import { CopyToClipboardButton } from "@/components/core";
import { sanitizeExcelCell } from "../utils/sanitizeExcelCell";

interface Props {
  className?: string;
  data: ExcelTableRow[];
}

export const CopyTableButton = ({ data }: Props) => {
  if (data.length === 0) return null;

  const handleCopy = async () => {
    const lines = data.map((r) =>
      [
        // Activity
        sanitizeExcelCell(r.activity),
        // Base Activity (same source field)
        sanitizeExcelCell(r.activity),
        // Category
        sanitizeExcelCell(r.category),
        // Time
        sanitizeExcelCell(r.start_time),
        // Duration
        sanitizeExcelCell(r.duration),
        // Date
        sanitizeExcelCell(r.date),
        // % of day
        sanitizeExcelCell(r.percentage),
      ].join("\t"),
    );

    const text = lines.join("\n");
    await navigator.clipboard.writeText(text);
  };

  return <CopyToClipboardButton onCopy={handleCopy} />;
};
