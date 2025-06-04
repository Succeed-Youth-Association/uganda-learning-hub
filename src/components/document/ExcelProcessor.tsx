
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { ExcelSheet } from '../../types/document';
import * as XLSX from 'xlsx';

interface ExcelProcessorProps {
  excelData: ExcelSheet[];
  activeSheet: number;
  onSheetChange: (index: number) => void;
  onExport: () => void;
}

export const ExcelProcessor: React.FC<ExcelProcessorProps> = ({
  excelData,
  activeSheet,
  onSheetChange,
  onExport
}) => {
  if (!excelData || excelData.length === 0) return null;

  const currentSheet = excelData[activeSheet];
  if (!currentSheet || !currentSheet.data || currentSheet.data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data found in this sheet
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Sheet Tabs */}
      {excelData.length > 1 && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {excelData.map((sheet: any, index: number) => (
              <button
                key={index}
                onClick={() => onSheetChange(index)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  index === activeSheet
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sheet Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">
            {currentSheet.name}
          </h3>
          <Button
            onClick={onExport}
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSheet.data.map((row: any[], rowIndex: number) => (
                <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-50' : ''}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-2 text-sm border-r border-gray-200 ${
                        rowIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      {cell || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const processExcelFile = async (blob: Blob): Promise<ExcelSheet[]> => {
  const arrayBuffer = await blob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
  const sheetsData = workbook.SheetNames.map(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1, 
      defval: '',
      raw: false 
    });
    return {
      name: sheetName,
      data: jsonData
    };
  });
  
  return sheetsData;
};

export const exportExcelSheet = (excelData: ExcelSheet[], activeSheet: number, filename: string): void => {
  if (!excelData || !excelData[activeSheet]) return;
  
  const worksheet = XLSX.utils.aoa_to_sheet(excelData[activeSheet].data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, excelData[activeSheet].name);
  XLSX.writeFile(workbook, `${filename}-${excelData[activeSheet].name}.xlsx`);
};
