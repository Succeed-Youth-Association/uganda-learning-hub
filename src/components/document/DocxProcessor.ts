
import mammoth from 'mammoth';

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
