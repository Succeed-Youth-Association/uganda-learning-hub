
/**
 * Utility functions for loading resource data from JSON files
 */

export interface ResourceDocument {
  pdfUrl: string;
}

/**
 * Configuration for subjects available per class
 * Add or remove subjects based on your actual data availability
 */
const CLASS_SUBJECTS_CONFIG: { [key: string]: string[] } = {
  // NURSERY SECTION
  'baby': [
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
  ],
  'middle': [
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
  ],
  'top': [
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
  ],

  // LOWER PRIMARY
  'p1': [
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
  ],
  'p2': [
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
  ],
  'p3': [
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
  ],

  // UPPER PRIMARY
  'p4': [
    'MTC',
    'IRE'
  ],
  'p5': [
    'CRE',
    'Science',
    'SST',
    'Theology',
    'English',
    'ICT',
    'IRE',
    'Kiswahili',
    'MTC'
  ],
  'p6': [
    'CRE',
    'Science',
    'SST',
    'Theology',
    'English',
    'ICT',
    'IRE',
    'Kiswahili',
    'MTC'
  ],
  'p7': [
    'CRE',
    'Science',
    'SST',
    'Theology',
    'English',
    'ICT',
    'IRE',
    'Kiswahili',
    'MTC'
  ],

  // LOWER SECONDARY - Customized per class based on actual data
  's1': [
    'French',
    'Geography',
    'History',
    'ICT',
    'Literature',
    'Mathematics',
    'Physics',
    'Biology',
    'Chemistry',
    'English',
    'Technology and Design',
    'Agriculture'
  ],
  's2': [
    'Geography',
    'History',
    'Mathematics',
    'Biology',
    'English',
    'Technology and Design'
  ],
  's3': [
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
    'Biology',
    'Chemistry',
    'English',
    'Agriculture'
  ],
  's4': [
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
  ],

  // UPPER SECONDARY
  's5': [
    'Physics',
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
  ],
  's6': [
    'Physics',
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
    'IPS',
    'Technology and Design'
  ]
};

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
 * Gets the available subjects for a specific class based on configuration
 * @param classId - The class identifier (e.g., 'p1', 'baby', 's1')
 * @returns Array of subject names available for the class
 */
export const getSubjectsForClass = (classId: string): string[] => {
  return CLASS_SUBJECTS_CONFIG[classId] || [];
};
