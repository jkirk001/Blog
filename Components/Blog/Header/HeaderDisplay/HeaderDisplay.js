import { Fragment } from "react";
import Icons from "../Icons/icons";
import Author from "../Author/Author";
import styles from "./HeaderDisplay.module.css";

const Header = (props) => {
  const testImages = [
    "test.jpg",
    "serverSide.jpg",
    "js.jpg",
    "react.jpg",
    "setup.jpg",
  ];
  let testImage = `/postImages/${
    testImages[Math.floor(Math.random() * testImages.length)]
  }`;
  console.log(`Test${props.data}`);
  return (
    <Fragment>
      <h1 className={styles.title}>{props.data.title}</h1>
      <Icons data={props.data.tags} type={"blog"} />
      <Author data={props.data.author} />
      <div className={styles.info}>
        <img src={props.data.mainImg ? props.data.mainImg : testImage} />
      </div>
    </Fragment>
  );
};

export default Header;
