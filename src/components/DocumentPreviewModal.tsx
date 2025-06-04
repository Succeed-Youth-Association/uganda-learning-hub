import React, { useState, useEffect } from 'react';
import { X, Download, Loader2, FileText, Grid, Presentation } from 'lucide-react';
import { Button } from './ui/button';
import DocxProcessor from './document/DocxProcessor';
import { processDocxFile } from './document/DocxProcessor';
import { processExcelFile, ExcelSheet } from './document/ExcelProcessor';

interface DocumentPreviewModalProps {
  documentUrl: string;
  documentTitle: string;
  onClose: () => void;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  documentUrl,
  documentTitle,
  onClose
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [excelData, setExcelData] = useState<ExcelSheet[] | null>(null);
  const [activeSheet, setActiveSheet] = useState(0);

  const getFileType = (url: string) => {
    const extension = url.toLowerCase().split('.').pop();
    if (extension === 'docx') return 'docx';
    if (['xlsx', 'xls'].includes(extension || '')) return 'excel';
    if (['pptx', 'ppt'].includes(extension || '')) return 'powerpoint';
    if (extension === 'pdf') return 'pdf';
    return 'unknown';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'docx': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'excel': return <Grid className="w-5 h-5 text-green-600" />;
      case 'powerpoint': return <Presentation className="w-5 h-5 text-orange-600" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const fetchFileFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (err) {
      throw new Error(`Failed to fetch file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDocxFile = async (blob: Blob) => {
    try {
      const htmlContent = await processDocxFile(blob);
      setDocumentContent(htmlContent);
      setExcelData(null);
    } catch (error) {
      console.error('Error processing DOCX file:', error);
      throw new Error('Failed to process DOCX file');
    }
  };

  const handleExcelFile = async (blob: Blob) => {
    try {
      const sheetsData = await processExcelFile(blob);
      setExcelData(sheetsData);
      setActiveSheet(0);
      setDocumentContent('');
    } catch (error) {
      console.error('Error processing Excel file:', error);
      throw new Error('Failed to process Excel file');
    }
  };

  const handlePdfFile = (url: string) => {
    setDocumentContent(`<iframe src="${url}" width="100%" height="600px" style="border: none;"></iframe>`);
    setExcelData(null);
  };

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        const fileType = getFileType(documentUrl);
        
        if (fileType === 'pdf') {
          handlePdfFile(documentUrl);
        } else {
          const blob = await fetchFileFromUrl(documentUrl);
          
          switch (fileType) {
            case 'docx':
              await handleDocxFile(blob);
              break;
            case 'excel':
              await handleExcelFile(blob);
              break;
            default:
              throw new Error('Unsupported file type');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document');
        setDocumentContent('');
        setExcelData(null);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [documentUrl]);

  const handleDownload = async () => {
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = documentTitle;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const exportExcelSheet = () => {
    if (!excelData || !excelData[activeSheet]) return;
    
    const { processExcelFile } = require('./document/ExcelProcessor');
    const XLSX = require('xlsx');
    
    const worksheet = XLSX.utils.aoa_to_sheet(excelData[activeSheet].data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, excelData[activeSheet].name);
    XLSX.writeFile(workbook, `${documentTitle}-${excelData[activeSheet].name}.xlsx`);
  };

  const renderExcelContent = () => {
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
              {excelData.map((sheet: ExcelSheet, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveSheet(index)}
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
              onClick={exportExcelSheet}
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

  const fileType = getFileType(documentUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {getFileIcon(fileType)}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{documentTitle}</h2>
              <p className="text-sm text-gray-600">{fileType.toUpperCase()} Document</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center bg-red-50 p-8 rounded-lg">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="h-full overflow-auto">
              {fileType === 'docx' && documentContent && (
                <div className="p-8">
                  <DocxProcessor content={documentContent} title={documentTitle} />
                </div>
              )}

              {fileType === 'pdf' && documentContent && (
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: documentContent }}
                />
              )}
              
              {fileType === 'excel' && excelData && renderExcelContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
