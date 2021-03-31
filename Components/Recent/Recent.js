import styles from "./recent.module.css";
import Link from "next/link";
import { Fragment } from "react";
import insertionSort from "../../utils/insertionSort";
import Icons from "../Blog/Header/Icons/icons";

const Recent = (props) => {
  const { data } = props;
  let array = [];
  if (data) {
    array = insertionSort(data);
    array = array.slice(array.length - 3, array.length).reverse();
  } else {
    array = [{ title: "Next" }, { title: "Pingu" }, { title: "22222" }];
  }

  const display = array.map((item, index) => {
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

    return (
      <Link key={`${item._id}`} href={`${item._id}`}>
        <div
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),url(${item.mainImg ? item.mainImg : testImage})`,
            backgroundSize: "cover",
          }}
          className={styles.recentArticle}
        >
          <div className={styles.recentInfo}>
            <span>{item.title}</span>
            <p>{item.quip}</p>
          </div>
          <div className={styles.icons}>
            <Icons data={item.tags} />
          </div>
        </div>
      </Link>
    );
  });

  return (
    <Fragment>
      <h2>Recent</h2>
      <div className={styles.recent}>{display}</div>
    </Fragment>
  );
};

export default Recent;
