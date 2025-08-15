export const sanitizeExcelCell = (value: string | number) =>
  String(value).replace(/\t/g, " ").replace(/\r?\n/g, " ");
