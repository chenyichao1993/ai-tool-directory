'use client';

import React, { useEffect, useState } from 'react';

// Tool type definition
interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tool data');
        return res.json();
      })
      .then((data) => {
        setTools(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900">
        Discover the best AI websites and AI tools
      </h1>
      <div className="max-w-2xl mx-auto border-b border-gray-200 mb-8"></div>
      {loading && <div className="text-center text-gray-500">Loading tools...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {tools.map((tool, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center border border-gray-100"
          >
            <h2 className="font-semibold text-lg mb-1 text-gray-800">{tool.name}</h2>
            <div className="text-xs text-indigo-600 mb-2">{tool.category}</div>
            <p className="text-gray-600 text-sm line-clamp-3 mb-2">{tool.description}</p>
            {tool.websiteUrl && (
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-indigo-600 hover:underline text-sm font-medium"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}