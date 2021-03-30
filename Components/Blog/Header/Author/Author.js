import styles from "./Author.module.css";

const Author = (props) => {
  return (
    <div className={styles.authorInfo}>
      <span>Author: Jon Evron</span>
      <span>Date: 3/22/2021</span>
      <span>5 Minute Read</span>
    </div>
  );
};

export default Author;
