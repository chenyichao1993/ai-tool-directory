import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <Image src="/logo.png" alt="logo" width={36} height={36} />
            <Image src="/toolaize-logo.png" alt="Toolaize" width={110} height={24} style={{marginLeft: 0}} />
          </div>
          <div className={styles.slogan}>Discover the best AI tools for every task.</div>
        </div>
        <div className={styles.linksWrap}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Resources</div>
            <Link href="/categories" className={styles.link}>All Categories</Link>
            <Link href="/" className={styles.link}>All Tools</Link>
            <Link href="/faq" className={styles.link}>FAQ</Link>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>Support</div>
            <Link href="/submit" className={styles.link}>Submit Tool</Link>
            <Link href="/update" className={styles.link}>Update Tool</Link>
            <a href="mailto:cocolovetin@foxmail.com" className={styles.link}>Contact Us</a>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>About</div>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/team" className={styles.link}>Team</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Service Terms</Link>
          </div>
        </div>
      </div>
      <div className={styles.fullDivider} />
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Toolaize. All Rights Reserved.</span>
      </div>
    </footer>
  );
} 