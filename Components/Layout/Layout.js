import styles from "./Layout.module.css";
import Head from "next/head";

export default function Layout({
  children,
  title = "This is the default title",
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Evron.dev :: Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.navbar}>
        <div className={styles.logo}></div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
