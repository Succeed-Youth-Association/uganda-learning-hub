
/**
 * Maps class IDs and resource types to their respective GitHub repository URLs
 */

interface GitHubRepoMapping {
  [classId: string]: {
    [resourceType: string]: string;
  };
}

const GITHUB_REPO_MAPPING: GitHubRepoMapping = {
  // Example mappings - you can add more as needed
  'p1': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p1-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p1-past-papers'
  },
  'p2': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p2-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p2-past-papers'
  },
  'p3': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p3-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p3-past-papers'
  },
  'p4': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p4-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p4-past-papers'
  },
  'p5': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p5-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p5-past-papers'
  },
  'p6': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p6-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p6-past-papers'
  },
  'p7': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p7-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/p7-past-papers'
  },
  's1': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s1-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s1-past-papers'
  },
  's2': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s2-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s2-past-papers'
  },
  's3': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s3-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s3-past-papers'
  },
  's4': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s4-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s4-past-papers'
  },
  's5': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s5-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s5-past-papers'
  },
  's6': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s6-notes',
    'past-past-papers': 'https://github.com/Fresh-Teacher/s6-past-papers'
  }
};

/**
 * Gets the GitHub repository URL for a specific class and resource type
 */
export const getGitHubRepoUrl = (classId: string, resourceType: string): string | null => {
  const classMapping = GITHUB_REPO_MAPPING[classId];
  if (!classMapping) return null;
  
  return classMapping[resourceType] || null;
};

/**
 * Checks if a GitHub repository is configured for a specific class and resource type
 */
export const hasGitHubRepo = (classId: string, resourceType: string): boolean => {
  return getGitHubRepoUrl(classId, resourceType) !== null;
};

/**
 * Gets all available GitHub repositories for a specific class
 */
export const getAvailableGitHubRepos = (classId: string): string[] => {
  const classMapping = GITHUB_REPO_MAPPING[classId];
  return classMapping ? Object.keys(classMapping) : [];
};
