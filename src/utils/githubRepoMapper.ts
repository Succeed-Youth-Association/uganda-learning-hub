
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
    'past-papers': 'https://github.com/Fresh-Teacher/p1-papers'
  },
  'p2': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p2-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p2-papers'
  },
  'p3': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p3-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p3-papers'
  },
  'p4': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p4-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p4-papers'
  },
  'p5': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p5-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p5-papers'
  },
  'p6': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p6-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p6-papers'
  },
  'p7': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/p7-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/p7-papers'
  },
  's1': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s1-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s1-papers'
  },
  's2': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s2-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s2-papers'
  },
  's3': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s3-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s3-papers'
  },
  's4': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s4-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s4-papers'
  },
  's5': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s5-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s5-papers'
  },
  's6': {
    'lesson-notes': 'https://github.com/Fresh-Teacher/s6-notes',
    'past-papers': 'https://github.com/Fresh-Teacher/s6-papers'
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
