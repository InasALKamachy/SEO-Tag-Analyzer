import React from "react";
import { OpenGraphTags, TwitterTags } from "@/lib/types";

interface SocialMediaTagsProps {
  openGraph: OpenGraphTags;
  twitter: TwitterTags;
}

export default function SocialMediaTags({ openGraph, twitter }: SocialMediaTagsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Social Media Tags</h3>
      </div>
      <div className="p-6">
        {/* Open Graph Tags */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 3H12V7H9.5C7.57 7 6 8.57 6 10.5V13H3V17H6V21H10V17H12.5L13 13H10V10.5C10 10.22 10.22 10 10.5 10H13V6.12C11.71 5.7 10.62 5.5 9.5 5.5C7.02 5.5 5 7.02 5 9.5V11H2V15H5V21H9V15H11.5L12 11H9V9.5C9 9.22 9.22 9 9.5 9H13" />
            </svg>
            Open Graph Tags (Facebook)
          </h4>
          
          <div className="space-y-3">
            {/* og:title */}
            {openGraph.title ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta property="og:title" content="{openGraph.title}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No og:title tag found
              </div>
            )}
            
            {/* og:description */}
            {openGraph.description ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta property="og:description" content="{openGraph.description}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No og:description tag found
              </div>
            )}
            
            {/* og:image */}
            {openGraph.image ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta property="og:image" content="{openGraph.image}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No og:image tag found
              </div>
            )}
            
            {/* og:url */}
            {openGraph.url ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta property="og:url" content="{openGraph.url}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No og:url tag found
              </div>
            )}
          </div>
        </div>
        
        {/* Twitter Card Tags */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.1.17 4 4 0 0 1-.77-.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a7.93 7.93 0 0 1-1-.06 11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
            </svg>
            Twitter Card Tags
          </h4>
          
          <div className="space-y-3">
            {/* twitter:card */}
            {twitter.card ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta name="twitter:card" content="{twitter.card}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No twitter:card tag found
              </div>
            )}
            
            {/* twitter:title */}
            {twitter.title ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta name="twitter:title" content="{twitter.title}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No twitter:title tag found
              </div>
            )}
            
            {/* twitter:description */}
            {twitter.description ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta name="twitter:description" content="{twitter.description}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No twitter:description tag found
              </div>
            )}
            
            {/* twitter:image */}
            {twitter.image ? (
              <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
                &lt;meta name="twitter:image" content="{twitter.image}"&gt;
              </div>
            ) : (
              <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
                No twitter:image tag found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
