
import React from 'react';

interface DocxProcessorProps {
  content: string;
  title?: string;
}

const DocxProcessor: React.FC<DocxProcessorProps> = ({ content, title }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No content to display</p>
      </div>
    );
  }

  return (
    <div className="max-w-none bg-white">
      {title && (
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          lineHeight: '1.6',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      />
    </div>
  );
};

export default DocxProcessor;
