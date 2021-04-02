import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { ModeContext } from "../../Context/context";

export default function Layout({ children, title = "Evron.dev :: Blog" }) {
  const mainContext = useContext(ModeContext);
  return (
    <div
      className={
        mainContext.lightMode ? styles.container : styles.containerLight
      }
    >
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className={styles.navbar}>
        <img onClick={mainContext.switch} src="/logo2.png" />
        <div className={styles.navLinks}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/allPosts">
            <a>All Posts</a>
          </Link>
          <Link href="/chron">
            <a>Chronological</a>
          </Link>
          <Link href="/topics">
            <a>Topics</a>
          </Link>
          <Link href="/post">
            <a>Post</a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>2021 &copy;</span>
        <span>Something Else</span>
      </footer>
    </div>
  );
}
