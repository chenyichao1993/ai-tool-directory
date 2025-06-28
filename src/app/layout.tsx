import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "./BackToTop";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toolaize - Discover the best AI tools",
  description: "Toolaize helps you discover, compare, and leverage the best AI tools for every task.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Navbar />
        <MobileSidebar />
        {/* 移动端汉堡菜单按钮 */}
        <button
          className="fixed top-4 right-4 z-50 block md:hidden bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow"
          aria-label="Open sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
        </button>
        {/* 其他内容 */}
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
