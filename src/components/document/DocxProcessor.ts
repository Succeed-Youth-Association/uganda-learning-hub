
import mammoth from 'mammoth';

export const processDocxFile = async (blob: Blob): Promise<string> => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    
    // Use basic conversion options without the invalid images property
    const options = {
      arrayBuffer,
      includeDefaultStyleMap: true
    };
    
    const result = await mammoth.convertToHtml(options);
    
    if (result.messages.length > 0) {
      console.log('DOCX conversion messages:', result.messages);
    }
    
    // If conversion fails or returns empty, return a simple message
    if (!result.value || result.value.trim() === '') {
      return '<p>Document content could not be displayed properly. The file may be corrupted or in an unsupported format.</p>';
    }
    
    return result.value;
  } catch (error) {
    console.error('Error processing DOCX file:', error);
    // Return a simple fallback instead of throwing
    return '<p>Unable to display document content. The file format may not be supported or the file may be corrupted.</p>';
  }
};

// Add a default export for the processing function
export default processDocxFile;
