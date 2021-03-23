import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title = "Evron.dev :: Blog" }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.navbar}>
        <img src="/logo2.png" />
        <div className={styles.navLinks}>
          <Link href="/chron">
            <a>Chronological</a>
          </Link>
          <Link href="/topics">
            <a>Topics</a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>2021 &copy;</span>
      </footer>
    </div>
  );
}
