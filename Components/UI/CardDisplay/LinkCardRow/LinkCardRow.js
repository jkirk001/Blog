import styles from "./LinkCardRow.module.css";
import Link from "next/link";
import Icons from "../../Icons/Icons";

const LinkCardRow = (props) => {
  const item = props.data;
  return (
    <Link key={`${item._id}`} href={`/${item._id}`}>
      <a
        style={{
          backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),url(${item.img300})`,
          backgroundSize: "cover",
        }}
        className={styles.recentArticle}
        aria-label={`Press to read ${item.title}`}
      >
        <div className={styles.recentInfo}>
          <span>{item.title}</span>
          <p>{item.quip}</p>
        </div>
        <div className={styles.icons}>
          <Icons data={item.tags ? item.tags : []} />
        </div>
      </a>
    </Link>
  );
};
export default LinkCardRow;
