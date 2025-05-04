import React from "react";
import { OpenGraphTags, TwitterTags } from "@/lib/types";
import { Image } from "lucide-react";

interface PreviewCardsProps {
  title: {
    content: string;
    length: number;
    status: "good" | "warning" | "error";
  };
  description: {
    content: string | null;
    length: number;
    status: "good" | "warning" | "error";
  };
  url: string;
  openGraph: OpenGraphTags;
  twitter: TwitterTags;
}

export default function PreviewCards({ title, description, url, openGraph, twitter }: PreviewCardsProps) {
  // Display hostname without protocol
  const displayUrl = url.replace(/^https?:\/\//, '');
  
  // Format URL for display in Google search result
  const formatDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.hostname}${urlObj.pathname}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Search & Social Previews</h3>
      </div>
      <div className="p-6">
        {/* Google Search Preview */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Google Search Preview</h4>
          <div className="rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-primary underline line-clamp-1">
              {title.content}
            </div>
            <div className="text-xs text-green-700 mt-1">
              {formatDisplayUrl(url)}
            </div>
            <div className="text-xs text-neutral-600 mt-1 line-clamp-2">
              {description.content || "No description available"}
            </div>
          </div>
        </div>
        
        {/* Facebook Preview */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Facebook Preview</h4>
          <div className="rounded-lg border border-neutral-200 overflow-hidden">
            <div className="h-36 bg-neutral-200 flex items-center justify-center">
              {openGraph.image ? (
                <img 
                  src={openGraph.image} 
                  alt="Open Graph Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = 
                      '<div class="w-full h-full flex items-center justify-center"><span class="text-4xl text-neutral-400"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span></div>';
                  }}
                />
              ) : (
                <Image className="h-12 w-12 text-neutral-400" />
              )}
            </div>
            <div className="p-3">
              <div className="text-xs text-neutral-500 uppercase font-medium mb-1">{displayUrl}</div>
              <div className="font-medium line-clamp-1">{openGraph.title || title.content}</div>
              <div className="text-sm text-neutral-600 mt-1 line-clamp-3">
                {openGraph.description || description.content || "No description available"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Twitter Preview */}
        <div>
          <h4 className="font-medium mb-3">Twitter Preview</h4>
          <div className="rounded-lg border border-neutral-200 overflow-hidden">
            <div className="h-36 bg-neutral-200 flex items-center justify-center">
              {twitter.image ? (
                <img 
                  src={twitter.image} 
                  alt="Twitter Card Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = 
                      '<div class="w-full h-full flex items-center justify-center"><span class="text-4xl text-neutral-400"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span></div>';
                  }}
                />
              ) : (
                <Image className="h-12 w-12 text-neutral-400" />
              )}
            </div>
            <div className="p-3">
              <div className="font-medium line-clamp-1">{twitter.title || title.content}</div>
              <div className="text-sm text-neutral-600 mt-1 line-clamp-2">
                {twitter.description || description.content || "No description available"}
              </div>
              <div className="text-xs text-neutral-500 mt-2">{displayUrl}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
