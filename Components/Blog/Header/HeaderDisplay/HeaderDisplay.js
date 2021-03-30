import { Fragment } from "react";
import Icons from "../Icons/icons";
import Author from "../Author/Author";
import styles from "./HeaderDisplay.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <h1 className={styles.title}>{props.data.title}</h1>
      <Icons data={props.data.tags} />
      <Author data={props.data.author} />
      <div className={styles.info}>
        <img src={props.data.mainImg ? props.data.mainImg : "/test.jpg"} />
      </div>
    </Fragment>
  );
};

export default Header;
