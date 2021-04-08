import { Fragment } from "react";
import Icons from "../Icons/icons";
import Author from "../Author/Author";
import styles from "./HeaderDisplay.module.css";

const Header = (props) => {
  const { author, title, mainImg, tags, img600, img300, mainImgAlt } = props;

  return (
    <Fragment>
      <h1 className={styles.title}>{title}</h1>
      <Icons data={tags} type={"blog"} />
      <Author data={author} />
      <div className={styles.info}>
        <img
          srcSet={`${mainImg} 900w, ${img600} 600w, ${img300} 300w,
             `}
          sizes="(max-width: 600px) 300px,
             (max-width: 900px) 600px,
            (min-width:901px) 900px"
          src={mainImg}
          alt={mainImgAlt}
          height="600"
          width="900"
        />
      </div>
    </Fragment>
  );
};

export default Header;
