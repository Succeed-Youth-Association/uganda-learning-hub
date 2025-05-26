
/**
 * Extracts the file name from a URL and formats it to display properly
 * @param url - The full URL to the file
 * @returns The formatted file name in uppercase
 */
export const extractFileName = (url: string): string => {
  try {
    // Get the last part of the URL (after the last '/')
    const fileName = url.split('/').pop() || '';
    
    // Remove the file extension
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
    
    // Replace dots, underscores, and hyphens with spaces
    const cleanName = nameWithoutExtension
      .replace(/[._-]/g, ' ')
      .trim();
    
    // Convert to uppercase and clean up multiple spaces
    const formattedName = cleanName
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();
    
    return formattedName || 'UNTITLED DOCUMENT';
  } catch (error) {
    console.error('Error extracting file name:', error);
    return 'UNTITLED DOCUMENT';
  }
};

/**
 * Gets the file extension from a URL
 * @param url - The full URL to the file
 * @returns The file extension (e.g., 'PDF')
 */
export const getFileExtension = (url: string): string => {
  try {
    const fileName = url.split('/').pop() || '';
    const extension = fileName.split('.').pop() || '';
    return extension.toUpperCase();
  } catch (error) {
    console.error('Error getting file extension:', error);
    return 'FILE';
  }
};
