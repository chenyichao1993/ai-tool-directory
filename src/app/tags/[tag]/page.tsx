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

// Reusable ToolCard component (copied from your main page for consistency)
function ToolCard({ tool, idx, showTooltip, setShowTooltip }: {
  tool: Tool;
  idx: string;
  showTooltip: { [idx: string]: boolean };
  setShowTooltip: React.Dispatch<React.SetStateAction<{ [idx: string]: boolean }>>;
}) {
  const isRecraft = tool.name === 'Recraft';
  const logoUrls = getLogoUrl(tool.websiteUrl);
  const [logoSrc, setLogoSrc] = useState(isRecraft ? '/recraft.png' : logoUrls[0]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
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
    <div key={idx} className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg">
      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-10" aria-label={`View ${tool.name}`}>
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
          <p className="text-sm text-gray-500">{tool.category}</p>
        </div>
      </div>
      <p ref={descRef} className="mt-3 text-sm text-gray-700 line-clamp-2">{tool.description}</p>
    </div>
  );
}


export default function TagPage({ params }: { params: { tag: string } }) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState<{ [idx: string]: boolean }>({});

  const tagName = decodeURIComponent(params.tag).replace(/-/g, ' ');

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
      const results = allTools.filter(tool => 
        tool.tags && tool.tags.some(t => t.toLowerCase() === tagName.toLowerCase())
      );
      setFilteredTools(results);
      setLoading(false);
    }
  }, [allTools, tagName]);

  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tools with tag: <span className="text-[#7C5CFA]">{capitalizedTagName}</span>
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
              <ToolCard key={idx} tool={tool} idx={`tag-tool-${idx}`} showTooltip={showTooltip} setShowTooltip={setShowTooltip} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <h3 className="text-xl font-semibold">No tools found</h3>
            <p>We couldn't find any tools with the tag "{capitalizedTagName}".</p>
          </div>
        )}
      </div>
    </main>
  );
} 