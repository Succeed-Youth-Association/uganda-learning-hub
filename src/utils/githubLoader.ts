
export interface GitHubDocument {
  name: string;
  download_url: string;
  path: string;
  size: number;
}

const GITHUB_REPOS: Record<string, Record<string, string>> = {
  // Past Papers and Lesson Notes repositories
  's1': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s1-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s1-notes/contents'
  },
  's2': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s2-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s2-notes/contents'
  },
  's3': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s3-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s3-notes/contents'
  },
  's4': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s4-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s4-notes/contents'
  },
  's5': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s5-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s5-notes/contents'
  },
  's6': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s6-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s6-notes/contents'
  },
  'p1': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p1-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p1-notes/contents'
  },
  'p2': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p2-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p2-notes/contents'
  },
  'p3': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p3-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p3-notes/contents'
  },
  'p4': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p4-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p4-notes/contents'
  },
  'p5': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p5-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p5-notes/contents'
  },
  'p6': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p6-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p6-notes/contents'
  },
  'p7': {
    'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p7-past-papers/contents',
    'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p7-notes/contents'
  }
};

export const loadGitHubData = async (classId: string, resourceType: string): Promise<GitHubDocument[]> => {
  const repoUrl = GITHUB_REPOS[classId]?.[resourceType];
  
  if (!repoUrl) {
    console.log(`No GitHub repository found for ${classId} ${resourceType}`);
    return [];
  }

  try {
    console.log(`Fetching data from GitHub: ${repoUrl}`);
    const response = await fetch(repoUrl);
    
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for PDF files only
    const pdfFiles = data.filter((file: any) => 
      file.type === 'file' && 
      file.name.toLowerCase().endsWith('.pdf')
    );
    
    console.log(`Found ${pdfFiles.length} PDF files in GitHub repository`);
    return pdfFiles;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
};

export const hasGitHubRepo = (classId: string, resourceType: string): boolean => {
  return Boolean(GITHUB_REPOS[classId]?.[resourceType]);
};
