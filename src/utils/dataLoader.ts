/**
 * Utility functions for loading resource data from JSON files
 */

export interface ResourceDocument {
  pdfUrl: string;
  title?: string;
  description?: string;
  price?: number;
}

/**
 * Configuration for resources and subjects available per class
 * Structure: class -> resource types -> subjects for that resource
 */
interface ClassResourcesConfig { 
  [classId: string]: { 
    [resourceType: string]: string[] 
  } 
}

const CLASS_RESOURCES_CONFIG: ClassResourcesConfig = {
  // NURSERY SECTION
  'baby': {
    'lesson-notes': [
      'All Baby Class Lesson Notes',
    ],
    'past-papers': [
      'English Past Papers',
      'General Knowledge Past Papers',
      'Health Habits Past Papers',
      'Holiday Packages Past Papers',
      'Language Development Past Papers',
      'Literacy Past Papers',
      'Mathematical Concepts Past Papers',
      'Reading Past Papers',
      'Social Development Past Papers',
      'Writing Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'All Baby Class Schemes'
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  'middle': {
    'lesson-notes': [
      'All Lesson Notes'
    ],
    'past-papers': [
      'All Past Papers',
      'English Past Papers',
      'Health Habits Past Papers',
      'Language Development Past Papers',
      'Mathematical Concepts Past Papers',
      'Reading Past Papers',
      'Social Development Past Papers',
      'Writing Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'Middle Class All Schemes'
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  'top': {
    'lesson-notes': [
      'All Lesson Notes'
    ],
    'past-papers': [
      'English Past Papers',
      'Health Habits Past Papers',
      'Language Development Past Papers',
      'Literacy Past Papers',
      'Mathematical Concepts Past Papers',
      'Reading Past Papers',
      'Social Development Past Papers',
      'Writing Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'All Schemes of Work'
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },

  // LOWER PRIMARY
  'p1': {
    'lesson-notes': [
      'English Lesson Notes',
      'ICT Lesson Notes',
      'Literacy 1 Lesson Notes',
      'Literacy 2 Lesson Notes',
      'Luganda Lesson Notes',
      'MTC Lesson Notes',
      'News Lesson Notes',
      'RE',
      'Reading Lesson Notes',
      'Runyankore Rukiga Lesson Notes',
      'Thematic Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'Literacy 1 Past Papers',
      'Literacy 2 Past Papers',
      'Luganda Past Papers',
      'MTC Past Papers',
      'RE',
      'Reading Past Papers',
      'Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'All Schemes of Work',
      'English Schemes of Work',
      'Literature 1 Schemes of Work',
      'Literature 2 Schemes of Work',
      'Luganda Schemes of Work',
      'MTC Schemes of Work',
      'Music Schemes of Work',
      'PE Schemes of Work',
      'RE',
      'Reading Schemes of Work',
      'Thematic Schemes of Work'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  'p2': {
    'lesson-notes': [
      'All Lesson Notes',
      'English Lesson Notes',
      'ICT Lesson Notes',
      'Literacy 1 Lesson Notes',
      'Literacy 2 Lesson Notes',
      'Luganda Lesson Notes',
      'MTC Lesson Notes',
      'News Lesson Notes',
      'PE Lesson Notes',
      'RE',
      'Reading Lesson Notes',
      'Runyankore Rukiga Lesson Notes',
      'Thematic Lesson Notes',
      'Writing Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'Literacy 1 Past Papers',
      'Literacy 2 Past Papers',
      'Luganda Past Papers',
      'MTC Past Papers',
      'RE Past Papers',
      'Reading Past Papers',
      'Theology Past Papers',
      'Writing Past Papers'
      
    ],
    'schemes-of-work': [
      'All Schemes of Work',
      'English Schemes of Work',
      'Literacy 1 Schemes of Work',
      'Literacy 2 Schemes of Work',
      'Luganda Schemes of Work',
      'MTC Schemes of Work',
      'PE Schemes of Work',
      'RE',
      'Reading Schemes of Work',
      'Thematic Schemes of Work'
      
    ]
  },
  'p3': {
    'lesson-notes': [
      'Art Lesson Notes',
      'English Lesson Notes',
      'Literacy 1 Lesson Notes',
      'Literacy 2 Lesson Notes',
      'Luganda Lesson Notes',
      'MTC Lesson Notes',
      'RE',
      'Reading Lesson Notes',
      'Runyankore Rukiga Lesson Notes',
      'Writing Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'Kiswahili Past Papers',
      'Literacy 1 Past Papers',
      'Literacy 2 Past Papers',
      'Luganda Past Papers',
      'MTC Past Papers',
      'RE',
      'Reading Past Papers',
      'Writing Past Papers'
      
    ],
    'schemes-of-work': [
      'Agriculture Schemes of Work',
      'All Schemes of Work',
      'Art Schemes of Work',
      'English Schemes of Work',
      'ICT Schemes of Work',
      'Luganda Schemes of Work',
      'MTC Schemes of Work',
      'PE Schemes of Work',
      'RE Schemes of Work',
      'Reading Schemes of Work',
      'Science Schemes of Work',
      'Social Studies Schemes of Work',
      'Thematic'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },

  // UPPER PRIMARY
  'p4': {
    'lesson-notes': [
      'English Lesson Notes',
      'MTC Lesson Notes',
      'RE Lesson Notes',
      'Science Lesson Notes',
      'SST Lesson Notes',
      'ICT Lesson Notes'
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'MTC Past Papers',
      'RE Past Papers',
      'Science Past Papers',
      'SST Past Papers',
      'Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'All Schemes of Work'
    ]
  },
  'p5': {
    'lesson-notes': [
      'English Lesson Notes',
      'MTC Lesson Notes',
      'RE Lesson Notes',
      'Science Lesson Notes',
      'SST Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'MTC Past Papers',
      'RE Past Papers',
      'Science Past Papers',
      'SST Past Papers',
      'Theology Past Papers'
      
    ],
    'schemes-of-work': [
      'Art Schemes of Work',
      'English Schemes of Work',
      'MTC Schemes of Work',
      'PE Schemes of Work',
      'RE Schemes of Work',
      'Science Schemes of Work',
      'SST Schemes of Work'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  'p6': {
    'lesson-notes': [
      'English Lesson Notes',
      'ICT Lesson Notes',
      'MTC Lesson Notes',
      'RE Lesson Notes',
      'Science Lesson Notes',
      'SST Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'ICT Past Papers',
      'Kiswahili Past Papers',
      'MTC Past Papers',
      'RE Past Papers',
      'Science Past Papers',
      'SST Past Papers'
      
    ],
    'schemes-of-work': [
      'Art Schemes of Work',
      'English Schemes of Work',
      'MTC Schemes of Work',
      'RE Schemes of Work',
      'Science Schemes of Work',
      'SST Schemes of Work'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  'p7': {
    'lesson-notes': [
      'Art Lesson Notes',
      'English Lesson Notes',
      'ICT Lesson Notes',
      'MTC Lesson Notes',
      'RE Lesson Notes',
      'Science Lesson Notes',
      'SST Lesson Notes'
      
    ],
    'past-papers': [
      'English Past Papers',
      'MTC Past Papers',
      'Science Past Papers',
      'SST Past Papers'
      
    ],
    'schemes-of-work': [
      'Art Schemes of Work',
      'English Schemes of Work',
      'MTC Schemes of Work',
      'RE Schemes of Work',
      'Science Schemes of Work',
      'SST Schemes of Work'
      
    ]
  },

  // LOWER SECONDARY
  's1': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Arabic Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Commerce Lesson Notes',
      'CRE Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'FN Lesson Notes',
      'French Lesson Notes',
      'Geography Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Physics Lesson Notes',
      'Sign Language Lesson Notes',
      'TD Lesson Notes',
      'Technology and Design'
      
    ],
    'past-papers': [
      'Agriculture Past Papers',
      'All Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Commerce Past Papers',
      'CRE Past Papers',
      'English Past Papers',
      'Entrepreneurship Past Papers',
      'FN Past Papers',
      'History Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Mathematics Past Papers',
      'Music Past Papers',
      'Physical Education Past Papers',
      'Physics Past Papers'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  's2': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Chinese Lesson Notes',
      'Commerce Lesson Notes',
      'CRE Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'FN Lesson Notes',
      'French Lesson Notes',
      'Geography Lesson Notes',
      'German Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Latin Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Physics Lesson Notes',
      'Sign Language Lesson Notes',
      'Technical Drawing Lesson Notes',
      'Technology and Design Lesson Notes'
      
    ],
    'past-papers': [
      'Agriculture Past Papers',
      'All Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Commerce Past Papers',
      'CRE Past Papers',
      'English Past Papers',
      'Entrepreneurship Past Papers',
      'French Past Papers',
      'Geography Past Papers',
      'History Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Luganda Past Papers',
      'Mathematics Past Papers',
      'Music Past Papers',
      'Physical Education Past Papers',
      'Physics Past Papers',
      'Technical Drawing Past Papers'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  's3': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Commerce Lesson Notes',
      'CRE Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'FN Lesson Notes',
      'Geography Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Latin Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Physics Lesson Notes',
      'Technical Drawing (TD) Lesson Notes'
      
    ],
    'past-papers': [
      'Accounts Past Papers',
      'Agriculture Past Papers',
      'All Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Commerce Past Papers',
      'CRE Past Papers',
      'English Past Papers',
      'Entrepreneurship Past Papers',
      'FN Past Papers',
      'Geography Past Papers',
      'History Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Luganda Past Papers',
      'Mathematics Past Papers',
      'Physics Past Papers',
      'Technical Drawing (TD) Past Papers'
      
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },
  's4': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Arabic Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Chinese Lesson Notes',
      'Commerce Lesson Notes',
      'CRE Lesson Notes',
      'Economics Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'FN Lesson Notes',
      'French Lesson Notes',
      'Geography Lesson Notes',
      'German Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Latin Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Physics Lesson Notes',
      'Technology and Design Lesson Notes',
    ],
    'past-papers': [
      'Accounts Past Papers',
      'Agriculture Past Papers',
      'All Past Papers',
      'Arabic Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Commerce Past Papers',
      'CRE Past Papers',
      'English Past Papers',
      'Entrepreneurship Past Papers',
      'FN Past Papers',
      'French Past Papers',
      'Geography Past Papers',
      'German Past Papers',
      'Graphics Past Papers',
      'ICT Past Papers',
      'IPS Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Luganda Past Papers',
      'Lumasaba Past Papers',
      'Lusoga Past Papers',
      'Mathematics Past Papers',
      'Physics Past Papers',
      'Runyoro Past Papers',
      'Studio Technology Past Papers',
      'TD Past Papers',
    ],
    'holiday-packages': [
      'Holiday Packages'
    ]
  },

  // UPPER SECONDARY
  's5': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Divinity Lesson Notes',
      'Economics Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'Geography Lesson Notes',
      'GP Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IPS Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Mixed Lesson Notes',
      'Physics Lesson Notes',
      'TD Lesson Notes',
      'Technical Drawing Lesson Notes',
    ],
    'past-papers': [
      'Agriculture Past Papers',
      'All Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Divinity Past Papers',
      'Economics Past Papers',
      'Entrepreneurship Past Papers',
      'General Paper Past Papers',
      'Geography Past Papers',
      'German Past Papers',
      'History Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Luganda Past Papers',
      'Mathematics Past Papers',
      'Physics Past Papers',
    ]
  },
  's6': {
    'lesson-notes': [
      'Agriculture Lesson Notes',
      'Art Lesson Notes',
      'Biology Lesson Notes',
      'Chemistry Lesson Notes',
      'Divinity Lesson Notes',
      'Economics Lesson Notes',
      'English Lesson Notes',
      'Entrepreneurship Lesson Notes',
      'Geography Lesson Notes',
      'GP Lesson Notes',
      'History Lesson Notes',
      'ICT Lesson Notes',
      'IPS Lesson Notes',
      'IRE Lesson Notes',
      'Kiswahili Lesson Notes',
      'Literature Lesson Notes',
      'Luganda Lesson Notes',
      'Mathematics Lesson Notes',
      'Mixed Lesson Notes',
      'Physics Lesson Notes',
      'TD Lesson Notes',
      'Technical Drawing Lesson Notes',
    ],
    'past-papers': [
      'Agriculture Past Papers',
      'All Past Papers',
      'Arabic Past Papers',
      'Art Past Papers',
      'Biology Past Papers',
      'Chemistry Past Papers',
      'Commerce Past Papers',
      'Divinity Past Papers',
      'English Past Papers',
      'Entrepreneurship Past Papers',
      'FN Past Papers',
      'French Past Papers',
      'Geography Past Papers',
      'German Past Papers',
      'GP Past Papers',
      'History Past Papers',
      'ICT Past Papers',
      'IRE Past Papers',
      'Kiswahili Past Papers',
      'Literature Past Papers',
      'Luganda Past Papers',
      'Lumasaba Past Papers',
      'Lusoga Past Papers',
      'Mathematics Past Papers',
      'Music Past Papers',
      'Physics Past Papers',
      'TD Past Papers',
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

/**
 * Gets all available classes
 */
export const getAvailableClasses = (): string[] => {
  return Object.keys(CLASS_RESOURCES_CONFIG);
};

/**
 * Gets formatted class title
 */
export const getClassTitle = (classId: string): string => {
  const classMap: { [key: string]: string } = {
    'baby': 'Baby Class',
    'middle': 'Middle Class', 
    'top': 'Top Class',
    'p1': 'Primary One',
    'p2': 'Primary Two',
    'p3': 'Primary Three',
    'p4': 'Primary Four',
    'p5': 'Primary Five',
    'p6': 'Primary Six',
    'p7': 'Primary Seven',
    's1': 'Senior One',
    's2': 'Senior Two',
    's3': 'Senior Three',
    's4': 'Senior Four',
    's5': 'Senior Five',
    's6': 'Senior Six'
  };
  return classMap[classId] || 'Unknown Class';
};

/**
 * Gets formatted resource type title
 */
export const getResourceTypeTitle = (resourceType: string): string => {
  const typeMap: { [key: string]: string } = {
    'lesson-notes': 'Lesson Notes',
    'schemes-of-work': 'Schemes of Work',
    'past-papers': 'Past Papers',
    'holiday-packages': 'Holiday Packages',
    'textbooks': 'Textbooks'
  };
  return typeMap[resourceType] || 'Resources';
};
