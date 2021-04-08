import styles from "./LinkCard.module.css";
import Link from "next/link";
import Icons from "../../Icons/Icons";

const LinkCard = (props) => {
  const item = props.data;
  return (
    <Link key={`${item._id}`} href={`${item._id}`}>
      <div className={styles.recentArticle}>
        <img
          srcSet={`${item.mainImg} 900w, ${item.img600} 600w, ${item.img300} 300w,
             `}
          sizes="(max-width: 600px) 300px,
             (max-width: 900px) 600px,
            (min-width:901px) 900px"
          src={item.mainImg}
          alt="Test"
        />
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
