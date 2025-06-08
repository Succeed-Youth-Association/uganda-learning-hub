
import React from 'react';

interface FileTypeIconProps {
  type: string;
  className?: string;
}

const FileTypeIcon: React.FC<FileTypeIconProps> = ({ type, className }) => {
  const baseClass = `w-8 h-8 ${className}`;
  
  switch (type) {
    case 'pdf':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#e74c3c" stroke="#c0392b" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#e74c3c"/>
          <path d="M12 2v5h5" fill="none" stroke="#c0392b" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">PDF</text>
        </svg>
      );
    case 'doc':
    case 'docx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#2b579a" stroke="#1e4e8c" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#2b579a"/>
          <path d="M12 2v5h5" fill="none" stroke="#1e4e8c" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">W</text>
        </svg>
      );
    case 'xls':
    case 'xlsx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#217346" stroke="#1a6339" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#217346"/>
          <path d="M12 2v5h5" fill="none" stroke="#1a6339" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">X</text>
        </svg>
      );
    case 'ppt':
    case 'pptx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#d24726" stroke="#b33d1e" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#d24726"/>
          <path d="M12 2v5h5" fill="none" stroke="#b33d1e" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">P</text>
        </svg>
      );
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#9b59b6" stroke="#8e44ad" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#9b59b6"/>
          <path d="M12 2v5h5" fill="none" stroke="#8e44ad" strokeWidth="1"/>
          <circle cx="9" cy="10" r="1" fill="white"/>
          <path d="M8 14l2-2 3 3 2-2 2 2v2H8v-3z" fill="white"/>
        </svg>
      );
    case 'txt':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#7f8c8d" stroke="#6c7a7b" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#7f8c8d"/>
          <path d="M12 2v5h5" fill="none" stroke="#6c7a7b" strokeWidth="1"/>
          <path d="M7 10h6M7 12h6M7 14h4" stroke="white" strokeWidth="1"/>
        </svg>
      );
    default:
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#95a5a6"/>
          <path d="M12 2v5h5" fill="none" stroke="#7f8c8d" strokeWidth="1"/>
        </svg>
      );
  }
};

export default FileTypeIcon;
