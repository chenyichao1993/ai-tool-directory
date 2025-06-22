"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Crumb {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  paths?: Crumb[]; // 可选，传递则手动模式，否则自动模式
}

// 路由-名称映射（可扩展）
const routeMap: Record<string, string> = {
  "categories": "Category",
  "tools": "Tool",
  "tags": "Tag"
};

export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  const pathname = usePathname();

  // 自动模式：根据当前路径生成面包屑
  let crumbs: Crumb[] = [];
  if (paths && paths.length > 0) {
    crumbs = paths;
  } else {
    // 自动拆分路径
    const segments = pathname.split("/").filter(Boolean);
    crumbs.push({ name: "Home", href: "/" });
    let href = "";
    segments.forEach((seg, idx) => {
      href += "/" + seg;
      // 动态参数处理
      let name = routeMap[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      // 如果是最后一级且有动态参数（如工具名、分类名），可进一步优化
      if (idx === segments.length - 1 && seg !== "categories" && seg !== "tools" && seg !== "tags") {
        name = decodeURIComponent(seg).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      }
      crumbs.push({ name, href: idx === segments.length - 1 ? undefined : href });
    });
  }

  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-1 text-gray-400">&gt;</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-gray-700 font-medium">
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-400">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 