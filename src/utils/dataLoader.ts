
/**
 * Utility functions for loading resource data from JSON files
 */

export interface ResourceDocument {
  title: string;
  pdfUrl: string;
}

/**
 * Loads resource documents for a specific class, subject, and resource type
 * @param classId - The class identifier (e.g., 'p1', 'baby', 's1')
 * @param subject - The subject name (e.g., 'Mathematics', 'English')
 * @param resourceType - The type of resource (e.g., 'past-papers', 'lesson-notes')
 * @returns Promise<ResourceDocument[]>
 */
export const loadResourceData = async (
  classId: string,
  subject: string,
  resourceType: string
): Promise<ResourceDocument[]> => {
  try {
    // Normalize subject name for file naming (replace spaces with hyphens, lowercase)
    const normalizedSubject = subject.toLowerCase().replace(/\s+/g, '-');
    
    // Construct the file path: /data/{classId}/{resourceType}/{subject}.json
    const filePath = `/data/${classId}/${resourceType}/${normalizedSubject}.json`;
    
    console.log(`Loading data from: ${filePath}`);
    
    const response = await fetch(filePath);
    
    if (!response.ok) {
      console.warn(`No data found for ${classId}/${resourceType}/${normalizedSubject}`);
      return [];
    }
    
    const data = await response.json();
    
    // Validate that the data is an array
    if (!Array.isArray(data)) {
      console.error(`Invalid data format in ${filePath}. Expected array.`);
      return [];
    }
    
    return data as ResourceDocument[];
  } catch (error) {
    console.error(`Error loading resource data for ${classId}/${subject}/${resourceType}:`, error);
    return [];
  }
};

/**
 * Gets the available subjects for a class level
 * This could also be loaded from JSON files if needed
 */
export const getSubjectsForClass = (classId: string): string[] => {
  const nurserySubjects = ['English', 'Mathematics', 'Science', 'Social Studies', 'Art'];
  const primarySubjects = ['English', 'Mathematics', 'Science', 'Social Studies', 'Religious Education'];
  const secondarySubjects = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Literature', 'Economics', 'Agriculture'];

  if (['baby', 'middle', 'top'].includes(classId)) {
    return nurserySubjects;
  } else if (['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].includes(classId)) {
    return primarySubjects;
  } else {
    return secondarySubjects;
  }
};
