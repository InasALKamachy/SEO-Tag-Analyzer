export interface SEOAnalysisResult {
  url: string;
  score: number;
  metaTagsCount: number;
  title: {
    content: string;
    length: number;
    status: "good" | "warning" | "error";
    message?: string;
  };
  description: {
    content: string | null;
    length: number;
    status: "good" | "warning" | "error";
    message?: string;
  };
  viewport: {
    content: string | null;
    status: "good" | "warning" | "error";
    message?: string;
  };
  canonical: {
    content: string | null;
    status: "good" | "warning" | "error";
    message?: string;
  };
  robots: {
    content: string | null;
    status: "good" | "warning" | "error" | "not-required";
  };
  charset: {
    content: string | null;
    status: "good" | "warning" | "error";
  };
  language: {
    content: string | null;
    status: "good" | "warning" | "error";
  };
  openGraph: OpenGraphTags;
  twitter: TwitterTags;
  recommendations: Recommendation[];
}

export interface OpenGraphTags {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  type: string | null;
  siteName: string | null;
}

export interface TwitterTags {
  card: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  site: string | null;
  creator: string | null;
}

export interface Recommendation {
  title: string;
  description: string;
  example?: string;
  priority: "high" | "medium" | "low";
}
