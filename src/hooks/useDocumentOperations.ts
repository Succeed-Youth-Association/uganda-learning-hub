
import { extractFileName } from '../utils/fileUtils';
import { ResourceDocument } from '../utils/dataLoader';
import { GitHubDocument } from '../utils/githubLoader';

export const useDocumentOperations = () => {
  const handleWhatsAppShare = (document: ResourceDocument | GitHubDocument, isGitHub: boolean) => {
    const name = isGitHub ? (document as GitHubDocument).name : extractFileName((document as ResourceDocument).pdfUrl);
    const url = isGitHub ? (document as GitHubDocument).download_url : (document as ResourceDocument).pdfUrl;
    // Use encodeURI to properly handle spaces and special characters
    const encodedUrl = encodeURI(url);
    const message = `Hello, I found this educational document named ${name} useful so I decided to share it with you. \n\n Click this link to view it: ${encodedUrl}\n\n For more resources like this, go to Google and search for *Fresh Teacher's Library*.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return {
    handleWhatsAppShare
  };
};
