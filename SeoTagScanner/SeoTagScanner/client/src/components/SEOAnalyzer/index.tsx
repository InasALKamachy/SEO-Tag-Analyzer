import React, { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEOAnalysisResult } from "@/lib/types";
import AnalysisResults from "./AnalysisResults";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const { toast } = useToast();

  const {
    data: analysisResult,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery<SEOAnalysisResult>({
    queryKey: [`/api/analyze?url=${encodeURIComponent(submittedUrl)}`, submittedUrl],
    enabled: !!submittedUrl,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to analyze",
        variant: "destructive",
      });
      return;
    }

    try {
      // Validate URL format
      new URL(url.startsWith("http") ? url : `https://${url}`);
      setSubmittedUrl(url.startsWith("http") ? url : `https://${url}`);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL with correct format",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setSubmittedUrl("");
  };

  const showResults = submittedUrl && !isLoading && !isFetching && !error;
  const showError = submittedUrl && !isLoading && !isFetching && error;
  const showLoading = submittedUrl && (isLoading || isFetching);

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <svg
              className="w-6 h-6 text-primary mr-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3v18h18" />
              <path d="m3 15 5-5 5 5 8-8" />
            </svg>
            <h1 className="text-xl font-semibold text-neutral-800">
              SEO Tag Analyzer
            </h1>
          </div>

          <div className="w-full sm:w-auto">
            <form onSubmit={handleSubmit} className="flex w-full">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="w-full pl-10 pr-4 py-2 rounded-l-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg font-medium transition flex items-center"
              >
                <span>Analyze</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">
        {showLoading && <LoadingState />}
        {showError && <ErrorState onReset={resetForm} />}
        {showResults && analysisResult && (
          <AnalysisResults result={analysisResult} />
        )}
      </main>

      <footer className="bg-white border-t border-neutral-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-neutral-500 text-sm">
            <p>
              SEO Tag Analyzer © {new Date().getFullYear()} - Analyze and
              improve your website's SEO metadata
            </p>
            <p className="mt-2">
              This tool checks meta tags only. A comprehensive SEO strategy
              involves many other factors.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
