import styles from "./Author.module.css";

const Author = (props) => {
  const author = props.data;

  const displayDate = new Date(author.date);

  return (
    <div className={styles.authorInfo}>
      <span>
        <strong>
          {author.name === "Jon" ? "Jon Evron" : "Michael Castilla"}
        </strong>
      </span>
      <span>
        <time>{displayDate.toLocaleDateString("en-US")}</time>
      </span>
    </div>
  );
};

export default Author;
