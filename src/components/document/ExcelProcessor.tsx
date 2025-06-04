
import * as XLSX from 'xlsx';

export interface ExcelSheet {
  name: string;
  data: any[][];
}

export const processExcelFile = async (blob: Blob): Promise<ExcelSheet[]> => {
  const arrayBuffer = await blob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
  const sheetsData = workbook.SheetNames.map(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1, 
      defval: '',
      raw: false 
    }) as any[][]; // Explicitly cast to any[][] to match ExcelSheet interface
    
    return {
      name: sheetName,
      data: jsonData
    };
  });
  
  return sheetsData;
};
