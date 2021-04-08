import styles from "./LinkCard.module.css";
import Link from "next/link";
import Icons from "../../Icons/Icons";

const LinkCard = (props) => {
  const item = props.data;
  return (
    <Link key={`${item._id}`} href={`${item._id}`}>
      <a
        className={styles.recentArticle}
        aria-label={`Press to read ${item.title}`}
      >
        <img
          srcSet={`${item.mainImg} 900w, ${item.img600} 600w, ${item.img300} 300w,
             `}
          sizes="(max-width: 600px) 300px,
             (max-width: 900px) 600px,
            (min-width:901px) 900px"
          alt={item.mainImgAlt}
          height="200"
          width="400"
        />
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
export default LinkCard;
