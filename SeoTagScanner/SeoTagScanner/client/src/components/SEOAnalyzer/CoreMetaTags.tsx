import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface CoreMetaTagsProps {
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
}

export default function CoreMetaTags({ title, description, viewport, canonical }: CoreMetaTagsProps) {
  const statusIcons = {
    good: <CheckCircle className="text-secondary mr-2 h-5 w-5" />,
    warning: <AlertTriangle className="text-warning mr-2 h-5 w-5" />,
    error: <XCircle className="text-destructive mr-2 h-5 w-5" />,
  };

  const statusLabels = {
    good: "Good",
    warning: "Needs Improvement",
    error: "Missing",
  };

  const statusClasses = {
    good: "bg-secondary/10 text-secondary",
    warning: "bg-warning/10 text-warning",
    error: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Core Meta Tags</h3>
      </div>
      <div className="p-6">
        {/* Title Tag */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {statusIcons[title.status]}
              <h4 className="font-medium">Title Tag</h4>
            </div>
            <span className={`text-xs font-medium px-2 py-1 ${statusClasses[title.status]} rounded-full`}>
              {statusLabels[title.status]}
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
            &lt;title&gt;{title.content}&lt;/title&gt;
          </div>
          <div className="mt-2 text-sm text-neutral-600">
            <span className="font-medium">Length:</span> {title.length} characters (Recommended: 50-60)
          </div>
        </div>
        
        {/* Meta Description */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {statusIcons[description.status]}
              <h4 className="font-medium">Meta Description</h4>
            </div>
            <span className={`text-xs font-medium px-2 py-1 ${statusClasses[description.status]} rounded-full`}>
              {statusLabels[description.status]}
            </span>
          </div>
          {description.content ? (
            <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
              &lt;meta name="description" content="{description.content}"&gt;
            </div>
          ) : (
            <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
              No meta description found
            </div>
          )}
          <div className="mt-2 text-sm text-neutral-600">
            <span className="font-medium">Length:</span> {description.length} characters (Recommended: 150-160)
          </div>
        </div>
        
        {/* Meta Viewport */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {statusIcons[viewport.status]}
              <h4 className="font-medium">Meta Viewport</h4>
            </div>
            <span className={`text-xs font-medium px-2 py-1 ${statusClasses[viewport.status]} rounded-full`}>
              {statusLabels[viewport.status]}
            </span>
          </div>
          {viewport.content ? (
            <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
              &lt;meta name="viewport" content="{viewport.content}"&gt;
            </div>
          ) : (
            <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
              No viewport tag found
            </div>
          )}
        </div>
        
        {/* Canonical URL */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {statusIcons[canonical.status]}
              <h4 className="font-medium">Canonical URL</h4>
            </div>
            <span className={`text-xs font-medium px-2 py-1 ${statusClasses[canonical.status]} rounded-full`}>
              {statusLabels[canonical.status]}
            </span>
          </div>
          {canonical.content ? (
            <div className="bg-neutral-50 p-3 rounded-lg code text-sm">
              &lt;link rel="canonical" href="{canonical.content}"&gt;
            </div>
          ) : (
            <div className="bg-neutral-50 p-3 rounded-lg border border-dashed border-destructive/50 text-sm text-neutral-500 italic">
              No canonical URL tag found
            </div>
          )}
          {canonical.status === "error" && (
            <div className="mt-2 text-sm text-neutral-600">
              <span className="font-medium">Recommendation:</span> Add a canonical URL tag to prevent duplicate content issues.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
