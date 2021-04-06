import styles from "./Layout.module.css";
import Head from "next/head";
import { useContext, useState } from "react";
import { ModeContext } from "../../Context/context";
import Link from "next/link";
import TrailCol from "../UI/Animations/Trail-Col";

export default function Layout({ children, title = "Evron.dev :: Blog" }) {
  const mainContext = useContext(ModeContext);
  const [drawerOpen, setDrawer] = useState(false);
  const [open, set] = useState(true);

  const clickHandler = () => {
    setDrawer(!drawerOpen);
  };

  const links = [
    ["All Posts", "allPosts"],
    ["Chronological", "chron"],
    ["Topics", "topics"],
    ["Post", "post"],
  ];
  const display = links.map((items, index) => {
    return (
      <Link href={`/${items[1]}`} key={index}>
        <a className={styles.Links}>{items[0]}</a>
      </Link>
    );
  });
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
        <Link href="/">
          <a>
            <img src="/logo2.png" />
          </a>
        </Link>

        <div className={styles.drawer} onClick={clickHandler}></div>
        {drawerOpen ? (
          <div className={styles.drawerOpen}>
            <TrailCol open={open} onClick={() => set((state) => !state)}>
              {display}
            </TrailCol>
          </div>
        ) : (
          <div className={styles.navLinks}>{display}</div>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>2021 &copy;</span>

        <img
          src={mainContext.lightMode ? "/sun.svg" : "/sunset.svg"}
          onClick={mainContext.switch}
        />
      </footer>
    </div>
  );
}
