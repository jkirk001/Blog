import styles from "./LinkCard.module.css";
import Link from "next/link";
import Icons from "../../Icons/Icons";

const LinkCard = (props) => {
  const item = props.data;
  return (
    <Link key={`${item._id}`} href={`${item._id}`}>
      <div className={styles.recentArticle}>
        <img src={item.mainImg} />
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
export default LinkCard;
