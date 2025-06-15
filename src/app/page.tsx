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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAllMap, setShowAllMap] = useState<{ [cat: string]: boolean }>({});

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

  // 工具分组
  const groupedTools: { [cat: string]: Tool[] } = {};
  categories.forEach(cat => {
    groupedTools[cat] = tools.filter(t => t.category === cat);
  });

  // 分类详情页：只显示选中分类全部工具
  const isCategoryPage = selectedCategory !== 'All';

  // 首页分组瀑布流：每组显示前12个，more跳转到分类详情
  function handleShowAll(cat: string) {
    setSelectedCategory(cat);
    setShowAllMap({});
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边栏 - fixed定位，始终可见 */}
      <div className={`fixed top-0 left-0 h-screen z-30 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-0'} bg-white border-r border-gray-200 flex flex-col`}>
        {/* open/close 按钮（SVG图标+tooltip） */}
        {sidebarOpen ? (
          <div className="absolute top-4 right-[-20px] z-40">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow focus:outline-none relative"
              onClick={() => setSidebarOpen(false)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Close sidebar"
              type="button"
            >
              {/* SVG图标 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
                <rect x="7.5" y="5" width="2" height="10" rx="1" fill="#bbb" />
              </svg>
              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
                  Close sidebar
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="fixed top-4 left-4 z-40">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow focus:outline-none relative"
              onClick={() => setSidebarOpen(true)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Open sidebar"
              type="button"
            >
              {/* SVG图标 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
                <rect x="7.5" y="5" width="2" height="10" rx="1" fill="#bbb" />
              </svg>
              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
                  Open sidebar
                </div>
              )}
            </button>
          </div>
        )}
        {/* 分类列表 */}
        <div className={`flex flex-col gap-2 mt-16 px-2 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{maxHeight: 'calc(100vh - 48px)'}}>
          <button
            className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition ${selectedCategory === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* 主内容区，左侧留出sidebar宽度 */}
      <div className="flex-1 flex flex-col ml-0 md:ml-56">
        {/* 顶部导语 */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900 mt-8">
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
        {/* 分割线 */}
        <div className="max-w-2xl mx-auto border-b border-gray-200 mb-8"></div>
        {/* 错误或加载状态 */}
        {loading && <div className="text-center text-gray-500">Loading tools...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {/* 分类详情页 or 首页分组瀑布流 */}
        {isCategoryPage ? (
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
              <button
                className="text-indigo-600 hover:underline text-sm font-medium"
                onClick={() => setSelectedCategory('All')}
              >
                Back to All
              </button>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {groupedTools[selectedCategory]?.map((tool, idx) => (
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
          </div>
        ) : (
          <div className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
            {categories.map(cat => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{cat}</h2>
                  {/* More按钮始终显示 */}
                  <button
                    className="text-indigo-600 hover:underline text-sm font-medium"
                    onClick={() => handleShowAll(cat)}
                  >
                    More &raquo;
                  </button>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {groupedTools[cat].slice(0, 12).map((tool, idx) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}