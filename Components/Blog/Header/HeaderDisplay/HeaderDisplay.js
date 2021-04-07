import { Fragment } from "react";
import Icons from "../Icons/icons";
import Author from "../Author/Author";
import styles from "./HeaderDisplay.module.css";

const Header = (props) => {
  const { author, title, mainImg, tags } = props;

  return (
    <Fragment>
      <h1 className={styles.title}>{title}</h1>
      <Icons data={tags} type={"blog"} />
      <Author data={author} />
      <div className={styles.info}>
        <img src={mainImg} />
      </div>
    </Fragment>
  );
};

export default Header;
