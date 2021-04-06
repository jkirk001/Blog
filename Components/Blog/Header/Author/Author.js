import styles from "./Author.module.css";

const Author = (props) => {
  return (
    <div className={styles.authorInfo}>
      <span>
        <strong> Jon Evron</strong>
      </span>
      <span>
        <strong>3/22/2021</strong>
      </span>
    </div>
  );
};

export default Author;
