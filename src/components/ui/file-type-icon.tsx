
import { FileText, Grid, Presentation } from 'lucide-react';
import { FileType } from '../../types/document';

interface FileTypeIconProps {
  fileType: FileType;
  className?: string;
}

export const FileTypeIcon: React.FC<FileTypeIconProps> = ({ fileType, className = "w-5 h-5" }) => {
  switch (fileType) {
    case 'docx':
      return <FileText className={`${className} text-blue-600`} />;
    case 'excel':
      return <Grid className={`${className} text-green-600`} />;
    case 'powerpoint':
      return <Presentation className={`${className} text-orange-600`} />;
    case 'pdf':
      return <FileText className={`${className} text-red-600`} />;
    default:
      return <FileText className={`${className} text-gray-600`} />;
  }
};
