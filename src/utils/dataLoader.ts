
/**
 * Utility functions for loading resource data from JSON files
 */

export interface ResourceDocument {
  pdfUrl: string;
}

/**
 * Configuration for resources and subjects available per class
 * Structure: class -> resource types -> subjects for that resource
 */
const CLASS_RESOURCES_CONFIG: { 
  [classId: string]: { 
    [resourceType: string]: string[] 
  } 
} = {
  // NURSERY SECTION
  'baby': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  'middle': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  'top': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },

  // LOWER PRIMARY
  'p1': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  'p2': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  'p3': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },

  // UPPER PRIMARY
  'p4': {
    'lesson-notes': [
      'MTC',
      'IRE'
    ],
    'past-papers': [
      'MTC',
      'IRE'
    ]
  },
  'p5': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
      'CRE',
      'Science',
      'SST',
      'Theology',
      'English',
      'ICT',
      'IRE',
      'Kiswahili',
      'MTC'
    ]
  },
  'p6': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
      'CRE',
      'Science',
      'SST',
      'Theology',
      'English',
      'ICT',
      'IRE',
      'Kiswahili',
      'MTC'
    ]
  },
  'p7': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
      'CRE',
      'Science',
      'SST',
      'Theology',
      'English',
      'ICT',
      'IRE',
      'Kiswahili',
      'MTC'
    ]
  },

  // LOWER SECONDARY
  's1': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  's2': {
    'lesson-notes': [
      'Geography',
      'History',
      'Mathematics',
      'Biology',
      'English',
      'Technology and Design'
    ],
    'past-papers': [
      'Geography',
      'History',
      'Mathematics',
      'Biology',
      'English',
      'Technology and Design'
    ],
    'schemes-of-work': [
      'Geography',
      'History',
      'Mathematics',
      'Biology',
      'English',
      'Technology and Design'
    ]
  },
  's3': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  's4': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },

  // UPPER SECONDARY
  's5': {
    'lesson-notes': [
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
    'past-papers': [
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
    'schemes-of-work': [
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
    ]
  },
  's6': {
    'lesson-notes': [
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
    ],
    'past-papers': [
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
    ],
    'schemes-of-work': [
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
  }
};

/**
 * Loads resource documents for a specific class, subject, and resource type
 */
export const loadResourceData = async (
  classId: string,
  subject: string,
  resourceType: string
): Promise<ResourceDocument[]> => {
  try {
    const normalizedSubject = subject.toLowerCase().replace(/\s+/g, '-');
    const filePath = `/data/${classId}/${resourceType}/${normalizedSubject}.json`;
    
    console.log(`Loading data from: ${filePath}`);
    
    const response = await fetch(filePath);
    
    if (!response.ok) {
      console.warn(`No data found for ${classId}/${resourceType}/${normalizedSubject}`);
      return [];
    }
    
    const data = await response.json();
    
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
 * Gets the available resource types for a specific class
 */
export const getAvailableResourcesForClass = (classId: string): string[] => {
  const classConfig = CLASS_RESOURCES_CONFIG[classId];
  return classConfig ? Object.keys(classConfig) : [];
};

/**
 * Gets the available subjects for a specific class and resource type
 */
export const getSubjectsForClassAndResource = (classId: string, resourceType: string): string[] => {
  const classConfig = CLASS_RESOURCES_CONFIG[classId];
  if (!classConfig) return [];
  
  return classConfig[resourceType] || [];
};
