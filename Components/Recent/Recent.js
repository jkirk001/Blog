import styles from "./recent.module.css";
import Link from "next/link";
import { Fragment } from "react";

const Recent = (props) => {
  const { data } = props;
  let array = [];
  if (data) {
    for (let i = 0; i < 3; i++) {
      array.push(data[i]);
    }
  } else {
    array = [{ title: "Next" }, { title: "Pingu" }, { title: "22222" }];
  }

  const display = array.map((item, index) => {
    return (
      <Link href={`${item._id}`}>
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
          <span>{item.title}</span>
          <p>{item.quip}</p>
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
