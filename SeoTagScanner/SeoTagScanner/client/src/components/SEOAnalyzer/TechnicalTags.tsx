import React from "react";

interface TechnicalTagsProps {
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
}

export default function TechnicalTags({ robots, charset, language }: TechnicalTagsProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "good": return "Present";
      case "warning": return "Needs Improvement";
      case "error": return "Missing";
      case "not-required": return "Not Required";
      default: return "Unknown";
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "good": return "bg-secondary/10 text-secondary";
      case "warning": return "bg-warning/10 text-warning";
      case "error": return "bg-destructive/10 text-destructive";
      case "not-required": return "bg-neutral-100 text-neutral-500";
      default: return "bg-neutral-100 text-neutral-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Technical SEO Tags</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* robots */}
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Robots Tag</h4>
              <span className={`text-xs font-medium px-2 py-1 ${getStatusClass(robots.status)} rounded-full`}>
                {getStatusLabel(robots.status)}
              </span>
            </div>
            {robots.content ? (
              <div className="code text-sm">
                &lt;meta name="robots" content="{robots.content}"&gt;
              </div>
            ) : (
              <div className="text-sm text-neutral-600">
                {robots.status === "error" 
                  ? "No robots tag found. Consider adding one to control search engine crawling."
                  : "No robots tag found. This is generally acceptable as the default behavior is to allow indexing."}
              </div>
            )}
          </div>
          
          {/* hreflang */}
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Hreflang Tags</h4>
              <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-500 rounded-full">
                Not Required
              </span>
            </div>
            <div className="text-sm text-neutral-600">
              No hreflang tags found. Add these if your site has international or multilingual versions.
            </div>
          </div>
          
          {/* charset */}
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Character Set</h4>
              <span className={`text-xs font-medium px-2 py-1 ${getStatusClass(charset.status)} rounded-full`}>
                {getStatusLabel(charset.status)}
              </span>
            </div>
            {charset.content ? (
              <div className="code text-sm">
                &lt;meta charset="{charset.content}"&gt;
              </div>
            ) : (
              <div className="text-sm text-neutral-600 italic">
                No charset meta tag found
              </div>
            )}
          </div>
          
          {/* language */}
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">HTML Language</h4>
              <span className={`text-xs font-medium px-2 py-1 ${getStatusClass(language.status)} rounded-full`}>
                {getStatusLabel(language.status)}
              </span>
            </div>
            {language.content ? (
              <div className="code text-sm">
                &lt;html lang="{language.content}"&gt;
              </div>
            ) : (
              <div className="text-sm text-neutral-600 italic">
                No HTML language attribute found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
