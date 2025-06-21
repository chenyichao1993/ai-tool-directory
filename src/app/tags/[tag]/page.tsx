"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Tool type definition from your project
interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  tags: string[];
  id: string;
}

// Helper function to get logo URL
function getLogoUrl(websiteUrl: string) {
  try {
    const url = new URL(websiteUrl);
    return [
      `https://unavatar.io/${url.hostname}`,
      `https://api.faviconkit.com/${url.hostname}/64`,
    ];
  } catch {
    return [];
  }
}

// Reusable ToolCard component
function ToolCard({ tool }: { tool: Tool }) {
  const isRecraft = tool.name === 'Recraft';
  const logoUrls = getLogoUrl(tool.websiteUrl);
  const [logoSrc, setLogoSrc] = useState(isRecraft ? '/recraft.png' : logoUrls[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (el) {
      // Check if the description text is actually overflowing
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setIsClamped(hasOverflow);
    }
  }, [tool.description]);

  function handleLogoError() {
    if (isRecraft) {
      setLogoSrc('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="%23e5e7eb"/><text x="16" y="21" text-anchor="middle" font-size="14" fill="%239ca3af" font-family="Arial">AI</text></svg>');
    } else if (logoSrc === logoUrls[0] && logoUrls[1]) {
      setLogoSrc(logoUrls[1]);
    } else {
      setLogoSrc('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="%23e5e7eb"/><text x="16" y="21" text-anchor="middle" font-size="14" fill="%239ca3af" font-family="Arial">AI</text></svg>');
    }
  }
  
  return (
    <div 
      ref={cardRef}
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
      onMouseEnter={() => {
        if (isClamped) {
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link 
        href={`/tools/${tool.id}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0 z-10" 
        aria-label={`View ${tool.name}`}
      >
        <span className="sr-only">View {tool.name}</span>
      </Link>
      <div className="flex items-start gap-4">
        <img
          src={logoSrc}
          onError={handleLogoError}
          alt={`${tool.name} logo`}
          className="h-10 w-10 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">{tool.name}</h3>
          <p className="text-sm text-gray-500 min-h-[40px]">{tool.category}</p>
        </div>
        <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 z-20 text-gray-400 hover:text-indigo-600 transition-transform duration-300 ease-in-out transform group-hover:translate-x-0 translate-x-8 opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-from-square"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
        </a>
      </div>
      <div className="mt-3">
        <p ref={descRef} className="text-sm text-gray-700 line-clamp-2">
            {tool.description}
        </p>
      </div>
      {showTooltip && isClamped && (
        <div 
          className="absolute z-30 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-md shadow-lg pointer-events-none"
          style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
        >
          {tool.description}
          <div 
            className="absolute left-1/2 w-3 h-3 bg-gray-900 transform rotate-45 -translate-x-1/2" 
            style={{ top: '-6px' }}
          ></div>
        </div>
      )}
    </div>
  );
}


export default function TagPage({ params }: { params: { tag: string } }) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayTag, setDisplayTag] = useState('');
  
  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown'
        }));
        setAllTools(toolsWithId);
      });
  }, []);

  useEffect(() => {
    if (allTools.length > 0) {
      const slugToFind = decodeURIComponent(params.tag);
      
      const results = allTools.filter(tool => 
        tool.tags?.some(t => (t.toLowerCase().replace(/\s+/g, '-')) === slugToFind)
      );
      
      setFilteredTools(results);

      if (results.length > 0) {
        // Find the exact tag string from the first matching tool for correct capitalization
        const matchingTag = results[0].tags.find(t => (t.toLowerCase().replace(/\s+/g, '-')) === slugToFind);
        setDisplayTag(matchingTag || '');
      } else {
        // Fallback for title if no tools are found - this might not be perfectly capitalized
        const fallbackTag = slugToFind
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setDisplayTag(fallbackTag);
      }
      setLoading(false);
    }
  }, [allTools, params.tag]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tools with tag: <span className="text-[#7C5CFA]">{displayTag}</span>
          </h1>
          <Link href="/" className="text-indigo-600 hover:underline text-sm font-medium">
            &laquo; Back to All Tools
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading tools...</div>
        ) : filteredTools.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTools.map((tool, idx) => (
              <ToolCard key={idx} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <h3 className="text-xl font-semibold">No tools found</h3>
            <p>We couldn't find any tools with the tag "{displayTag}".</p>
          </div>
        )}
      </div>
    </main>
  );
} 