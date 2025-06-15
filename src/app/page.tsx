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
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  // 获取所有分类
  const categories = Array.from(new Set(tools.map(t => t.category))).filter(Boolean);

  // 实时过滤+分类筛选
  const filteredTools = tools.filter(tool => {
    const q = search.toLowerCase();
    const matchSearch =
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);
    const matchCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      {/* 顶部导语 */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900">
        Discover the best AI websites and AI tools
      </h1>
      {/* 搜索框 */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search AI tools by name, category or description..."
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
        />
      </div>
      {/* 分类筛选按钮 */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedCategory === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* 分割线 */}
      <div className="max-w-2xl mx-auto border-b border-gray-200 mb-8"></div>
      {/* 错误或加载状态 */}
      {loading && <div className="text-center text-gray-500">Loading tools...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* 工具卡片列表 */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {filteredTools.map((tool, idx) => (
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