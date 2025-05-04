import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { SEOAnalyzer } from "./seoAnalyzer";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to analyze a website
  app.get("/api/analyze", async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ error: "URL parameter is required" });
      }
      
      // Normalize URL
      const normalizedUrl = normalizeUrl(url);
      
      // Check if we have a cached analysis result
      const cachedResult = await storage.getAnalysisResult(normalizedUrl);
      if (cachedResult) {
        return res.json(cachedResult);
      }
      
      // Fetch the HTML content
      const response = await fetch(normalizedUrl, {
        headers: {
          "User-Agent": "SEO-Analyzer/1.0"
        }
      });
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `Failed to fetch website: ${response.statusText}` 
        });
      }
      
      const html = await response.text();
      
      // Analyze the HTML content
      const analyzer = new SEOAnalyzer(html, normalizedUrl);
      const result = analyzer.analyze();
      
      // Cache the result
      await storage.saveAnalysisResult(normalizedUrl, result);
      
      return res.json(result);
    } catch (error: any) {
      console.error("Error analyzing website:", error);
      return res.status(500).json({ error: error.message || "Failed to analyze website" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

function normalizeUrl(url: string): string {
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch (error) {
    throw new Error("Invalid URL format");
  }
}
