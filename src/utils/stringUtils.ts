
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatSubjectTitle = (subject: string, resourceType: string): string => {
  const capitalizedSubject = capitalizeWords(subject);
  const capitalizedResourceType = capitalizeWords(resourceType.replace(/-/g, ' '));
  return `${capitalizedSubject} ${capitalizedResourceType}`;
};
