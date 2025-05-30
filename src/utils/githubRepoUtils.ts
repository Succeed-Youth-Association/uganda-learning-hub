
export const getGitHubRepoUrl = (classId: string, resourceType: string): string | null => {
  const repoMap: { [key: string]: { [key: string]: string } } = {
    's1': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s1-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s1-notes/contents/'
    },
    's2': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s2-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s2-notes/contents/'
    },
    's3': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s3-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s3-notes/contents/'
    },
    's4': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s4-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s4-notes/contents/'
    },
    's5': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s5-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s5-notes/contents/'
    },
    's6': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/s6-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/s6-notes/contents/'
    },
    'p1': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p1-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p1-notes/contents/'
    },
    'p2': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p2-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p2-notes/contents/'
    },
    'p3': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p3-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p3-notes/contents/'
    },
    'p4': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p4-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p4-notes/contents/'
    },
    'p5': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p5-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p5-notes/contents/'
    },
    'p6': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p6-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p6-notes/contents/'
    },
    'p7': {
      'past-papers': 'https://api.github.com/repos/Fresh-Teacher/p7-past-papers/contents/',
      'lesson-notes': 'https://api.github.com/repos/Fresh-Teacher/p7-notes/contents/'
    }
  };

  return repoMap[classId]?.[resourceType] || null;
};
