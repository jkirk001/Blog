import styles from "./LinkCardRow.module.css";
import Link from "next/link";
import Icons from "../../Icons/Icons";

const LinkCardRow = (props) => {
  const item = props.data;
  return (
    <Link key={`${item._id}`} href={`${item._id}`}>
      <div
        style={{
          backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),url(${item.mainImg ? item.mainImg : "test.jpg"})`,
          backgroundSize: "cover",
        }}
        className={styles.recentArticle}
      >
        <div className={styles.recentInfo}>
          <span>{item.title}</span>
          <p>{item.quip}</p>
        </div>
        <div className={styles.icons}>
          <Icons data={item.tags ? item.tags : []} />
        </div>
      </div>
    </Link>
  );
};
export default LinkCardRow;
