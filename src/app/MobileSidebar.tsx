"use client";
import React, { useState } from "react";

const categories = [
  "AI Writing & Content Generation",
  "Image Generation & Design",
  "Video Production & Editing",
  "Audio Processing & Generation",
  "Office Productivity Tools",
  "Coding & Development",
  "Search & Prompt Engineering",
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  console.log('render MobileSidebar');
  return (
    <>
      {/* 汉堡菜单按钮 */}
      <button
        className="fixed top-4 right-4 z-[10000] pointer-events-auto block md:hidden bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow"
        onClick={() => { console.log('open'); setOpen(true); }}
        aria-label="Open sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
      {/* 弹出侧边栏 */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex md:hidden">
          <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
            {/* 关闭按钮 */}
            <button
              className="self-end mb-4 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {/* 分类按钮 */}
            <button
              className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition mb-2 bg-indigo-600 text-white border-indigo-600`}
              onClick={() => { window.location.href = '/'; setOpen(false); }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition mb-2 bg-white text-gray-700 border-gray-300 hover:bg-indigo-50`}
                onClick={() => { window.location.href = `/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`; setOpen(false); }}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* 点击遮罩关闭 */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
} 