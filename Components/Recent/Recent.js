import styles from "./recent.module.css";

const Search = (props) => {
  return (
    <div className={styles.recent}>
      <div className={styles.recentArticle}></div>
      <div className={styles.recentArticle}></div>
      <div className={styles.recentArticle}></div>
    </div>
  );
};

export default Search;
