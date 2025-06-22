"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/AI%20tool.json")
      .then(res => res.json())
      .then(data => {
        const cats = Array.from(new Set(data.map((t: any) => t.category))).filter(Boolean);
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Categories</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading categories...</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                className="block p-6 rounded-lg shadow bg-white hover:bg-indigo-50 border border-gray-200 transition"
              >
                <span className="text-lg font-semibold text-gray-800">{cat}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 