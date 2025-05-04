import { SEOAnalysisResult } from "@/lib/types";

// In-memory cache for recent analyses
// We could replace this with a database in a real production app
type AnalysisCache = {
  [url: string]: {
    result: SEOAnalysisResult;
    timestamp: number;
  };
};

class StorageService {
  private cache: AnalysisCache = {};
  private readonly CACHE_EXPIRY_MS = 3600000; // 1 hour

  async getAnalysisResult(url: string): Promise<SEOAnalysisResult | null> {
    const normalizedUrl = this.normalizeUrl(url);
    const cached = this.cache[normalizedUrl];
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_EXPIRY_MS) {
      return cached.result;
    }
    
    return null;
  }

  async saveAnalysisResult(url: string, result: SEOAnalysisResult): Promise<void> {
    const normalizedUrl = this.normalizeUrl(url);
    
    this.cache[normalizedUrl] = {
      result,
      timestamp: Date.now()
    };

    // Clean up old cache entries
    this.cleanupCache();
  }

  private normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      // Normalize to handle www vs non-www and trailing slashes
      return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`.replace(/\/$/, '');
    } catch (e) {
      return url;
    }
  }

  private cleanupCache(): void {
    const now = Date.now();
    
    for (const url in this.cache) {
      if (now - this.cache[url].timestamp > this.CACHE_EXPIRY_MS) {
        delete this.cache[url];
      }
    }
  }
}

export const storage = new StorageService();
