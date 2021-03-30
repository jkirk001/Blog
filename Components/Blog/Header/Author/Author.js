import styles from "./Author.module.css";

const Author = (props) => {
  return (
    <div className={styles.authorInfo}>
      <span>
        Author:<strong> Jon Evron</strong>
      </span>
      <span>
        Date: <strong>3/22/2021</strong>
      </span>
      <span>5 Minute Read</span>
    </div>
  );
};

export default Author;
