
import { FileType } from '../types/document';

export const getFileType = (url: string): FileType => {
  const extension = url.toLowerCase().split('.').pop();
  if (extension === 'docx') return 'docx';
  if (['xlsx', 'xls'].includes(extension || '')) return 'excel';
  if (['pptx', 'ppt'].includes(extension || '')) return 'powerpoint';
  if (extension === 'pdf') return 'pdf';
  return 'unknown';
};

export const fetchFileFromUrl = async (url: string): Promise<Blob> => {
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

export const downloadFile = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
