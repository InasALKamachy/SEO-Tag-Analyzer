import React from "react";
import { SEOAnalysisResult } from "@/lib/types";
import SEOScore from "./SEOScore";
import CoreMetaTags from "./CoreMetaTags";
import SocialMediaTags from "./SocialMediaTags";
import TechnicalTags from "./TechnicalTags";
import PreviewCards from "./PreviewCards";
import Recommendations from "./Recommendations";

interface AnalysisResultsProps {
  result: SEOAnalysisResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div>
      <SEOScore 
        score={result.score} 
        tagCount={result.metaTagsCount} 
        websiteUrl={result.url} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Core Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <CoreMetaTags 
            title={result.title}
            description={result.description}
            viewport={result.viewport}
            canonical={result.canonical}
          />
          <SocialMediaTags 
            openGraph={result.openGraph}
            twitter={result.twitter}
          />
          <TechnicalTags 
            robots={result.robots}
            charset={result.charset}
            language={result.language}
          />
        </div>
        
        {/* Right Column - Previews & Recommendations */}
        <div className="space-y-6">
          <PreviewCards
            title={result.title}
            description={result.description}
            url={result.url}
            openGraph={result.openGraph}
            twitter={result.twitter}
          />
          
          <Recommendations recommendations={result.recommendations} />
        </div>
      </div>
    </div>
  );
}
