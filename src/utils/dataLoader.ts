
/**
 * Utility functions for loading resource data from JSON files
 */

export interface ResourceDocument {
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
 * Gets the available subjects for a class level based on the provided specifications
 */
export const getSubjectsForClass = (classId: string): string[] => {
  // NURSERY SECTION (Baby, Middle, Top)
  const nurserySubjects = [
    'Literacy',
    'Mathematical Concepts', 
    'Reading',
    'Social Development',
    'Writing',
    'Theology',
    'English',
    'General Knowledge',
    'Health Habits',
    'Language Development'
  ];

  // LOWER PRIMARY (P1, P2, P3)
  const lowerPrimarySubjects = [
    'MTC',
    'Music',
    'Oral Literature',
    'PE',
    'Reading',
    'RE',
    'Thematic',
    'English',
    'Literacy 1',
    'Literacy 2',
    'Luganda'
  ];

  // UPPER PRIMARY (P4, P5, P6, P7)
  const upperPrimarySubjects = [
    'CRE',
    'Science',
    'SST',
    'Theology',
    'English',
    'ICT',
    'IRE',
    'Kiswahili',
    'MTC'
  ];

  // LOWER SECONDARY (S1, S2, S3, S4)
  const lowerSecondarySubjects = [
    'French',
    'Geography',
    'German',
    'History',
    'ICT',
    'IRE',
    'Kiswahili',
    'Latin',
    'Literature',
    'Luganda',
    'Mathematics',
    'Physics',
    'Technology and Design',
    'Agriculture',
    'Arabic',
    'Art',
    'Biology',
    'Chemistry',
    'Chinese',
    'Commerce',
    'CRE',
    'Economics',
    'English',
    'Entrepreneurship',
    'FN'
  ];

  // UPPER SECONDARY (S5, S6)
  const upperSecondarySubjects = [
    'Physics',
    'TD',
    'Technical Drawing',
    'Agriculture',
    'Art',
    'Biology',
    'Chemistry',
    'Divinity',
    'Economics',
    'English',
    'Entrepreneurship',
    'Geography',
    'General Paper',
    'History',
    'ICT',
    'IPS'
  ];

  if (['baby', 'middle', 'top'].includes(classId)) {
    return nurserySubjects;
  } else if (['p1', 'p2', 'p3'].includes(classId)) {
    return lowerPrimarySubjects;
  } else if (['p4', 'p5', 'p6', 'p7'].includes(classId)) {
    return upperPrimarySubjects;
  } else if (['s1', 's2', 's3', 's4'].includes(classId)) {
    return lowerSecondarySubjects;
  } else if (['s5', 's6'].includes(classId)) {
    return upperSecondarySubjects;
  } else {
    return [];
  }
};
