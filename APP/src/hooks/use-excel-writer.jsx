import * as XLSX from "xlsx";

export const useExcelWriter = (data = [], filename = "download.xlsx") => {
  if (!data) {
    console.error("Subject and data are required.");
    return;
  }
  const workbook = XLSX.utils.book_new();
  const raw = [];
  for (let i = 0; i < data.length; i++) {
    raw.push(data[i]);
  }

  const worksheet = XLSX.utils.aoa_to_sheet(raw);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};
