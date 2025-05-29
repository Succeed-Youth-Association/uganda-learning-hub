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
export const CLASS_RESOURCES_CONFIG: ClassResourcesConfig = {
  baby: {
    'past-papers': [],
    'holiday-packages': []
  },
  middle: {
    'past-papers': [
      'all',
      'writing-theology',
      'social-development',
      'health-habits',
      'language-development',
      'reading',
      'mathematical-concepts',
      'english'
    ],
    'lesson-notes': [],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  p2: {
    'past-papers': [
      'ict',
      'theology'
    ],
    'lesson-notes': [],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  p6: {
    'past-papers': [
      'kiswahili',
      'ict',
      're'
    ],
    'lesson-notes': [
      'ict',
      're'
    ],
    'schemes-of-work': [
      'art',
      're',
      'science',
      'mtc',
      'sst',
      'english'
    ],
    'holiday-packages': []
  },
  s1: {
    'past-papers': [
      'music'
    ],
    'lesson-notes': [
      'arabic'
    ],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  s2: {
    'lesson-notes': [
      'french',
      'chinese',
      'german',
      'latin',
      'commerce',
      'kiswahili',
      'fn',
      'entrepreneurship',
      'ire',
      'english',
      'literature',
      'cre',
      'luganda',
      'art',
      'agriculture',
      'ict'
    ],
    'past-papers': [
      'music'
    ],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  s4: {
    'past-papers': [
      'runyoro',
      'lumasaba',
      'studio-technology',
      'lusoga',
      'accounts',
      'german',
      'graphics',
      'td',
      'ips',
      'kiswahili'
    ],
    'lesson-notes': [
      'latin',
      'kiswahili',
      'technology-and-design',
      'luganda'
    ],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  s6: {
    'past-papers': [
      'music',
      'arabic',
      'commerce',
      'english',
      'german',
      'french',
      'fn'
    ],
    'lesson-notes': [
      'ips',
      'art',
      'agriculture',
      'english',
      'ire',
      'gp',
      'entrepreneurship'
    ],
    'schemes-of-work': [],
    'holiday-packages': []
  },
  fn: {
    'past-papers': [],
    'lesson-notes': [],
    'schemes-of-work': [],
    'holiday-packages': []
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
