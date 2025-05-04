import * as cheerio from "cheerio";
import { SEOAnalysisResult, Recommendation, OpenGraphTags, TwitterTags } from "@/lib/types";

export class SEOAnalyzer {
  private html: string;
  private url: string;
  private $: cheerio.CheerioAPI;
  private recommendations: Recommendation[] = [];

  constructor(html: string, url: string) {
    this.html = html;
    this.url = url;
    this.$ = cheerio.load(this.html);
  }

  analyze(): SEOAnalysisResult {
    // Core meta tags
    const title = this.analyzeTitle();
    const description = this.analyzeDescription();
    const viewport = this.analyzeViewport();
    const canonical = this.analyzeCanonical();
    
    // Social media tags
    const openGraph = this.analyzeOpenGraph();
    const twitter = this.analyzeTwitter();
    
    // Technical tags
    const robots = this.analyzeRobots();
    const charset = this.analyzeCharset();
    const language = this.analyzeLanguage();
    
    // Count meta tags
    const metaTagsCount = this.countMetaTags();
    
    // Calculate score based on analysis
    const score = this.calculateScore();

    return {
      url: this.url,
      score,
      metaTagsCount,
      title,
      description,
      viewport,
      canonical,
      robots,
      charset,
      language,
      openGraph,
      twitter,
      recommendations: this.recommendations,
    };
  }

  private analyzeTitle() {
    const titleElement = this.$('title').first();
    const content = titleElement.text() || "";
    const length = content.length;
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add a title tag",
        description: "Every page should have a unique, descriptive title tag. This is one of the most important SEO elements.",
        example: "<title>Your Page Title | Your Brand</title>",
        priority: "high"
      });
    } else if (length < 10) {
      status = "warning";
      this.recommendations.push({
        title: "Title tag is too short",
        description: `Your title is only ${length} characters. For optimal SEO, titles should be between 50-60 characters.`,
        priority: "medium"
      });
    } else if (length > 60) {
      status = "warning";
      this.recommendations.push({
        title: "Title tag is too long",
        description: `Your title is ${length} characters which may get truncated in search results. Aim for 50-60 characters.`,
        priority: "medium"
      });
    }
    
    return { content, length, status };
  }

  private analyzeDescription() {
    const metaDescription = this.$('meta[name="description"]').attr('content');
    const content = metaDescription || null;
    const length = content ? content.length : 0;
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add a meta description",
        description: "A meta description provides a summary of the page content and can improve click-through rates from search results.",
        example: '<meta name="description" content="A compelling description of your page that is 150-160 characters long to maximize visibility in search results.">',
        priority: "high"
      });
    } else if (length < 50) {
      status = "warning";
      this.recommendations.push({
        title: "Meta description is too short",
        description: `Your description is only ${length} characters. For optimal visibility, aim for 150-160 characters.`,
        priority: "medium"
      });
    } else if (length > 160) {
      status = "warning";
      this.recommendations.push({
        title: "Meta description is too long",
        description: `Your description is ${length} characters which may get truncated in search results. Aim for 150-160 characters.`,
        priority: "low"
      });
    }
    
    return { content, length, status };
  }

  private analyzeViewport() {
    const viewportContent = this.$('meta[name="viewport"]').attr('content');
    const content = viewportContent || null;
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add a viewport meta tag",
        description: "The viewport meta tag is essential for mobile-responsive design, which is a ranking factor for search engines.",
        example: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        priority: "high"
      });
    } else if (!content.includes('width=device-width')) {
      status = "warning";
      this.recommendations.push({
        title: "Improve viewport meta tag",
        description: "Your viewport tag should include 'width=device-width' for proper mobile responsiveness.",
        example: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        priority: "medium"
      });
    }
    
    return { content, status };
  }

  private analyzeCanonical() {
    const canonicalUrl = this.$('link[rel="canonical"]').attr('href');
    const content = canonicalUrl || null;
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add a canonical URL tag",
        description: "Canonical tags help prevent duplicate content issues and ensure search engines know which version of a page to index.",
        example: `<link rel="canonical" href="${this.url}">`,
        priority: "high"
      });
    } else if (!this.isValidUrl(content)) {
      status = "warning";
      this.recommendations.push({
        title: "Fix canonical URL format",
        description: "The canonical URL doesn't appear to be valid. Ensure it's an absolute URL with the proper protocol.",
        example: `<link rel="canonical" href="https://example.com/page">`,
        priority: "high"
      });
    }
    
    return { content, status };
  }

  private analyzeOpenGraph(): OpenGraphTags {
    const ogTitle = this.$('meta[property="og:title"]').attr('content') || null;
    const ogDescription = this.$('meta[property="og:description"]').attr('content') || null;
    const ogImage = this.$('meta[property="og:image"]').attr('content') || null;
    const ogUrl = this.$('meta[property="og:url"]').attr('content') || null;
    const ogType = this.$('meta[property="og:type"]').attr('content') || null;
    const ogSiteName = this.$('meta[property="og:site_name"]').attr('content') || null;
    
    if (!ogTitle) {
      this.recommendations.push({
        title: "Add og:title tag",
        description: "The og:title tag is used when your content is shared on Facebook and other platforms.",
        example: '<meta property="og:title" content="Your Page Title">',
        priority: "medium"
      });
    }
    
    if (!ogDescription) {
      this.recommendations.push({
        title: "Add og:description tag",
        description: "The og:description tag provides a summary when your content is shared on social media.",
        example: '<meta property="og:description" content="A compelling description for social sharing">',
        priority: "medium"
      });
    }
    
    if (!ogImage) {
      this.recommendations.push({
        title: "Add og:image tag",
        description: "Content with images gets more engagement on social media. Add an og:image tag with a high-quality image.",
        example: '<meta property="og:image" content="https://example.com/image.jpg">',
        priority: "medium"
      });
    }
    
    if (!ogUrl) {
      this.recommendations.push({
        title: "Add og:url tag",
        description: "The og:url tag helps with analytics and ensures the correct page URL is used when shared.",
        example: `<meta property="og:url" content="${this.url}">`,
        priority: "low"
      });
    }
    
    return {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      url: ogUrl,
      type: ogType,
      siteName: ogSiteName
    };
  }

  private analyzeTwitter(): TwitterTags {
    const twitterCard = this.$('meta[name="twitter:card"]').attr('content') || null;
    const twitterTitle = this.$('meta[name="twitter:title"]').attr('content') || null;
    const twitterDescription = this.$('meta[name="twitter:description"]').attr('content') || null;
    const twitterImage = this.$('meta[name="twitter:image"]').attr('content') || null;
    const twitterSite = this.$('meta[name="twitter:site"]').attr('content') || null;
    const twitterCreator = this.$('meta[name="twitter:creator"]').attr('content') || null;
    
    if (!twitterCard) {
      this.recommendations.push({
        title: "Add twitter:card tag",
        description: "The twitter:card tag defines how your content appears when shared on Twitter.",
        example: '<meta name="twitter:card" content="summary_large_image">',
        priority: "medium"
      });
    }
    
    if (!twitterTitle) {
      this.recommendations.push({
        title: "Add twitter:title tag",
        description: "Add a specific title for Twitter shares. If absent, Twitter may use the og:title or page title.",
        example: '<meta name="twitter:title" content="Your Page Title">',
        priority: "low"
      });
    }
    
    if (!twitterDescription) {
      this.recommendations.push({
        title: "Add twitter:description tag",
        description: "Add a description for Twitter shares. If absent, Twitter may use the og:description or meta description.",
        example: '<meta name="twitter:description" content="A compelling description for Twitter">',
        priority: "low"
      });
    }
    
    if (!twitterImage && !this.$('meta[property="og:image"]').attr('content')) {
      this.recommendations.push({
        title: "Add twitter:image tag",
        description: "Add an image for Twitter shares. Images significantly increase engagement.",
        example: '<meta name="twitter:image" content="https://example.com/image.jpg">',
        priority: "medium"
      });
    }
    
    return {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
      site: twitterSite,
      creator: twitterCreator
    };
  }

  private analyzeRobots() {
    const robotsContent = this.$('meta[name="robots"]').attr('content');
    const content = robotsContent || null;
    
    // Robots tag is not always required, but good to have
    let status: "good" | "warning" | "error" | "not-required" = content ? "good" : "not-required";
    
    if (content && (content.includes('noindex') || content.includes('none'))) {
      status = "warning";
      this.recommendations.push({
        title: "Review robots tag settings",
        description: "Your page is set to not be indexed by search engines. If this is intentional, you can ignore this warning.",
        priority: "high"
      });
    }
    
    return { content, status };
  }

  private analyzeCharset() {
    const charsetMeta = this.$('meta[charset]').attr('charset');
    const httpEquivCharset = this.$('meta[http-equiv="Content-Type"]').attr('content');
    
    let content = charsetMeta || null;
    if (!content && httpEquivCharset && httpEquivCharset.includes('charset=')) {
      content = httpEquivCharset.split('charset=')[1];
    }
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add character set declaration",
        description: "Specify the character encoding of your page to ensure proper text rendering.",
        example: '<meta charset="UTF-8">',
        priority: "medium"
      });
    } else if (content.toLowerCase() !== 'utf-8') {
      status = "warning";
      this.recommendations.push({
        title: "Consider using UTF-8 encoding",
        description: "UTF-8 is the recommended character encoding for web pages as it supports all languages and symbols.",
        example: '<meta charset="UTF-8">',
        priority: "low"
      });
    }
    
    return { content, status };
  }

  private analyzeLanguage() {
    const htmlLang = this.$('html').attr('lang');
    const content = htmlLang || null;
    
    let status: "good" | "warning" | "error" = "good";
    
    if (!content) {
      status = "error";
      this.recommendations.push({
        title: "Add language attribute to HTML tag",
        description: "Declaring the language helps search engines and browsers understand your content.",
        example: '<html lang="en">',
        priority: "medium"
      });
    }
    
    return { content, status };
  }

  private countMetaTags(): number {
    // Count all meta tags (including those we specifically analyze and others)
    return this.$('meta').length + 
           this.$('title').length + 
           this.$('link[rel="canonical"]').length;
  }

  private calculateScore(): number {
    let score = 100;
    
    // Critical factors (title, description, viewport)
    if (!this.$('title').text()) score -= 20;
    if (!this.$('meta[name="description"]').attr('content')) score -= 15;
    if (!this.$('meta[name="viewport"]').attr('content')) score -= 10;
    
    // Important factors (canonical, open graph, etc.)
    if (!this.$('link[rel="canonical"]').attr('href')) score -= 5;
    if (!this.$('meta[property="og:title"]').attr('content')) score -= 3;
    if (!this.$('meta[property="og:description"]').attr('content')) score -= 3;
    if (!this.$('meta[property="og:image"]').attr('content')) score -= 3;
    
    // Additional factors
    if (!this.$('meta[name="twitter:card"]').attr('content')) score -= 2;
    if (!this.$('html').attr('lang')) score -= 2;
    
    // Deduct for length issues
    const titleLength = this.$('title').text().length;
    if (titleLength > 0 && (titleLength < 10 || titleLength > 60)) score -= 3;
    
    const descLength = this.$('meta[name="description"]').attr('content')?.length || 0;
    if (descLength > 0 && (descLength < 50 || descLength > 160)) score -= 3;
    
    // Cap the score between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }
}
