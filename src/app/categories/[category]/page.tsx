"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  tags?: string[];
  id: string;
  screenshot?: string;
}

function ToolCard({ tool }: { tool: Tool }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const element = descRef.current;
    if (element) {
      if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
        setIsClamped(true);
      } else {
        setIsClamped(false);
      }
    }
  }, [tool.description, descRef]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isClamped && descRef.current) {
      const rect = descRef.current.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8 // 8px下方间距
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipPos(null);
  };

  return (
    <div
      className="group relative block bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      onClick={() => window.open(`/tools/${tool.id}`, '_blank')}
    >
      <a
        href={tool.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="absolute top-3 right-3 z-10 hidden group-hover:flex items-center justify-center w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full transition"
        title="Visit official website"
        aria-label="Visit official website"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="14" height="14" rx="3" stroke="#888" strokeWidth="1.5" fill="none"/>
          <path d="M9 7h4v4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11l4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <div className="h-40 w-full bg-gray-100 dark:bg-gray-700">
        {tool.screenshot ? (
          <img src={tool.screenshot} alt={tool.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 truncate text-gray-800 dark:text-white">{tool.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{tool.category}</p>
        <p
          ref={descRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="text-sm text-gray-600 dark:text-gray-300 relative"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: isClamped ? 'pointer' : 'default',
          }}
        >
          {tool.description}
        </p>
        {showTooltip && tooltipPos && (
          <div
            className="fixed z-50 bg-black text-white text-sm rounded px-4 py-3 shadow-lg max-w-xs w-max pointer-events-none"
            style={{
              left: tooltipPos.left,
              top: tooltipPos.top,
              transform: 'translateX(-50%)',
              whiteSpace: 'pre-line',
            }}
          >
            {tool.description}
            <span
              className="absolute left-1/2"
              style={{
                bottom: '100%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid #000',
                content: '""',
                display: 'block',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCategory, setDisplayCategory] = useState('');

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown',
        }));
        setAllTools(toolsWithId);
      });
  }, []);

  useEffect(() => {
    if (allTools.length > 0) {
      const slugToFind = decodeURIComponent(params.category);
      // 找到原始分类名
      const matchedTools = allTools.filter(tool =>
        tool.category && tool.category.toLowerCase().replace(/\s+/g, '-') === slugToFind
      );
      setFilteredTools(matchedTools);
      if (matchedTools.length > 0) {
        setDisplayCategory(matchedTools[0].category);
      } else {
        // 没有找到，格式化slug
        const fallback = slugToFind.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        setDisplayCategory(fallback);
      }
      setLoading(false);
    }
  }, [allTools, params.category]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {displayCategory} Tools
          </h1>
          <Link href="/" className="text-indigo-600 hover:underline text-sm font-medium">
            &laquo; Back to Home
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">加载工具中...</div>
        ) : filteredTools.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTools.map((tool, idx) => (
              <ToolCard key={idx} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <h3 className="text-xl font-semibold">未找到相关工具</h3>
            <p>该分类下没有工具。</p>
          </div>
        )}
      </div>
    </main>
  );
} 