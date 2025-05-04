import { Recommendation } from "./types";

/**
 * Generate a color class based on score
 */
export const getScoreColorClass = (score: number): string => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-secondary";
  if (score >= 50) return "text-amber-500";
  return "text-destructive";
};

/**
 * Sort recommendations by priority
 */
export const sortRecommendationsByPriority = (recommendations: Recommendation[]): Recommendation[] => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  return [...recommendations].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

/**
 * Validate URL format
 */
export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

/**
 * Format URL for display (remove protocol)
 */
export const formatDisplayUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
  } catch (e) {
    return url.replace(/^https?:\/\//, '');
  }
};
