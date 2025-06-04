
import mammoth from 'mammoth';

interface DocxProcessorProps {
  content: string;
}

export const DocxProcessor: React.FC<DocxProcessorProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="p-8 max-w-none">
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          lineHeight: '1.6',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      />
    </div>
  );
};

export const processDocxFile = async (blob: Blob): Promise<string> => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    
    if (result.messages.length > 0) {
      console.log('DOCX conversion messages:', result.messages);
    }
    
    return result.value;
  } catch (error) {
    console.error('Error processing DOCX file:', error);
    throw new Error('Failed to process DOCX file');
  }
};
