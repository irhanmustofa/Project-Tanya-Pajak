import { useState } from "react";
import * as XLSX from "xlsx";

export function useExcelReader(file) {
  const [content, setContent] = useState([]);
  const [column, setColumn] = useState([]);

  if (!file) return { content, column };

  try {
    const handleFile = async () => {
      const content = await file.arrayBuffer();
      const workbook = XLSX.read(content, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length > 0) {
        setContent(jsonData);
        setColumn(Object.keys(jsonData[0]));
      }
    };

    handleFile();

    return { content, column };
  } catch (error) {
    console.error(error);
  }
}
