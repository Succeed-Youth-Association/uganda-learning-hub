
import React, { useState, useEffect } from 'react';
import { DocumentPreviewModalProps, ExcelSheet } from '../types/document';
import { getFileType, fetchFileFromUrl, downloadFile } from '../utils/documentUtils';
import { DocumentModalHeader } from './document/DocumentModalHeader';
import { DocumentLoadingState } from './document/DocumentLoadingState';
import { DocumentErrorState } from './document/DocumentErrorState';
import { DocxProcessor, processDocxFile } from './document/DocxProcessor';
import { ExcelProcessor, processExcelFile, exportExcelSheet } from './document/ExcelProcessor';
import { PdfProcessor, processPdfFile } from './document/PdfProcessor';

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

  const fileType = getFileType(documentUrl);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        if (fileType === 'pdf') {
          const content = processPdfFile(documentUrl);
          setDocumentContent(content);
          setExcelData(null);
        } else {
          const blob = await fetchFileFromUrl(documentUrl);
          
          switch (fileType) {
            case 'docx':
              const docxContent = await processDocxFile(blob);
              setDocumentContent(docxContent);
              setExcelData(null);
              break;
            case 'excel':
              const excelSheets = await processExcelFile(blob);
              setExcelData(excelSheets);
              setActiveSheet(0);
              setDocumentContent('');
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
  }, [documentUrl, fileType]);

  const handleDownload = () => {
    downloadFile(documentUrl, documentTitle);
  };

  const handleExportExcelSheet = () => {
    if (excelData) {
      exportExcelSheet(excelData, activeSheet, documentTitle);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col m-4">
        <DocumentModalHeader
          documentTitle={documentTitle}
          fileType={fileType}
          onDownload={handleDownload}
          onClose={onClose}
        />

        <div className="flex-1 overflow-hidden">
          {loading && <DocumentLoadingState />}
          
          {error && (
            <DocumentErrorState error={error} onRetry={handleRetry} />
          )}

          {!loading && !error && (
            <div className="h-full overflow-auto">
              {fileType === 'docx' && documentContent && (
                <DocxProcessor content={documentContent} />
              )}

              {fileType === 'pdf' && documentContent && (
                <PdfProcessor url={documentUrl} />
              )}
              
              {fileType === 'excel' && excelData && (
                <ExcelProcessor
                  excelData={excelData}
                  activeSheet={activeSheet}
                  onSheetChange={setActiveSheet}
                  onExport={handleExportExcelSheet}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
