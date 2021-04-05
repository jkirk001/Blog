import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../../Context/context";

export default function Layout({ children, title = "Evron.dev :: Blog" }) {
  const mainContext = useContext(ModeContext);
  const [drawerOpen, setDrawer] = useState(false);

  const drawerClickHandler = () => {
    setDrawer(!drawerOpen);
  };

  return (
    <div
      className={
        mainContext.lightMode ? styles.container : styles.containerLight
      }
    >
      {drawerOpen ? (
        <div className={styles.modal} onClick={() => setDrawer(false)}></div>
      ) : null}
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
        <div className={styles.drawer} onClick={drawerClickHandler}></div>
        <div className={drawerOpen ? styles.drawerOpen : styles.navLinks}>
          <Link href="/">
            <a className={styles.Links}>Home</a>
          </Link>
          <Link href="/allPosts">
            <a className={styles.Links}>All Posts</a>
          </Link>
          <Link href="/chron">
            <a className={styles.Links}>Chronological</a>
          </Link>
          <Link href="/topics">
            <a className={styles.Links}>Topics</a>
          </Link>
          <Link href="/post">
            <a className={styles.Links}>Post</a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>2021 &copy;</span>
        <span>The hows and whys</span>
      </footer>
    </div>
  );
}
