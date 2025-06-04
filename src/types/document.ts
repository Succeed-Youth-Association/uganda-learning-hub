
export interface DocumentPreviewModalProps {
  documentUrl: string;
  documentTitle: string;
  onClose: () => void;
}

export interface ExcelSheet {
  name: string;
  data: any[][];
}

export type FileType = 'docx' | 'excel' | 'powerpoint' | 'pdf' | 'unknown';
