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
        <div className={styles.logo}></div>
        <div className={styles.navLinks}>
          <Link href="/chron">Chronological</Link>
          <Link href="/topics">Topics</Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
