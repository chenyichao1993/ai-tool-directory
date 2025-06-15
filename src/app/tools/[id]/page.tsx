"use client"

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        // 为每个工具生成id
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown'
        }))
        const found = toolsWithId.find((t: any) => t.id === params.id)
        setTool(found)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return <div className="text-center py-20 text-gray-500">加载中...</div>
  }
  if (!tool) {
    notFound()
  }

  // 示例截图和视频（可根据实际数据扩展）
  const screenshots = tool.screenshots || [
    '/placeholder1.png',
    '/placeholder2.png'
  ];
  const videoUrl = tool.videoUrl || '';
  const aiSummary = tool.aiSummary || 'AI智能摘要：本工具适用于...（后续可接AI接口自动生成）';
  const relatedTools: any[] = [];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 顶部信息区 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={tool.logoUrl}
                alt={tool.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
            </div>
            {/* 基本信息 */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
              <p className="mt-2 text-lg text-gray-600">{tool.description}</p>
              {/* 标签 */}
              {tool.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 主体内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI智能摘要 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI智能摘要</h2>
              <div className="text-gray-700 text-base">{aiSummary}</div>
            </section>
            {/* 截图/视频演示 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">截图与视频演示</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {screenshots.map((src: string, i: number) => (
                  <img key={i} src={src} alt="截图" className="w-60 h-36 object-cover rounded-lg border" />
                ))}
                {videoUrl && (
                  <video src={videoUrl} controls className="w-60 h-36 rounded-lg border" />
                )}
              </div>
            </section>
            {/* 详细介绍 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">详细介绍</h2>
              <div className="prose max-w-none">
                <p>{tool.description}</p>
              </div>
            </section>
            {/* 功能特点 */}
            {tool.features && (
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">功能特点</h2>
                <ul className="space-y-3">
                  {tool.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {/* 使用教程 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">使用教程</h2>
              <div className="prose max-w-none">
                <p>使用教程内容...</p>
              </div>
            </section>
          </div>
          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 官网链接 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">官网链接</h2>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                访问官网
                <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </section>
            {/* 价格信息 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">价格信息</h2>
              <div className="space-y-2">
                <p className="text-gray-600">价格信息...</p>
              </div>
            </section>
            {/* 相关工具推荐 */}
            {/* 可后续实现 */}
          </div>
        </div>
      </div>
    </main>
  )
} 