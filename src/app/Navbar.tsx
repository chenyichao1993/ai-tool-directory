'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: { en: "Home", zh: "首页" }, href: "/" },
  { name: { en: "Categories", zh: "分类" }, href: "/categories" },
  { name: { en: "Tags", zh: "标签" }, href: "/tags" },
  { name: { en: "About", zh: "关于我们" }, href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en'|'zh'>('en');
  const [showLang, setShowLang] = useState(false);
  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en');
  const handleLangClick = () => setShowLang(s => !s);
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logoWrap}>
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <span className={styles.siteName}>ToolAIze</span>
        </Link>
      </div>
      <div className={styles.desktopLinks}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.name[lang]}
          </Link>
        ))}
        <button className={styles.actionBtn}>{lang === 'en' ? 'Submit Tool' : '提交工具'}</button>
        <div className={styles.loginLangWrap}>
          <button className={styles.loginBtn}>{lang === 'en' ? 'Login' : '登录'}</button>
          <div className={styles.langSwitcher} onClick={handleLangClick} tabIndex={0}>
            <span className={styles.langIcon} role="img" aria-label="language">🌐</span>
            <span className={styles.langText}>{lang === 'en' ? 'EN' : '中文'}</span>
            <span className={styles.langArrow}>▼</span>
            {showLang && (
              <div className={styles.langDropdown} onClick={toggleLang}>
                {lang === 'en' ? '中文' : 'EN'}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={()=>setMenuOpen(false)}>
              {link.name[lang]}
            </Link>
          ))}
          <button className={styles.actionBtn}>{lang === 'en' ? 'Submit Tool' : '提交工具'}</button>
          <div className={styles.loginLangWrap}>
            <button className={styles.loginBtn}>{lang === 'en' ? 'Login' : '登录'}</button>
            <div className={styles.langSwitcher} onClick={handleLangClick} tabIndex={0}>
              <span className={styles.langIcon} role="img" aria-label="language">🌐</span>
              <span className={styles.langText}>{lang === 'en' ? 'EN' : '中文'}</span>
              <span className={styles.langArrow}>▼</span>
              {showLang && (
                <div className={styles.langDropdown} onClick={toggleLang}>
                  {lang === 'en' ? '中文' : 'EN'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 