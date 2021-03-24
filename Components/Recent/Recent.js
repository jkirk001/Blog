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

  return (
    <Fragment>
      <h2>Recent</h2>
      <div className={styles.recent}>
        <Link href={`${array[0]._id}`}>
          <div className={styles.recentArticle}>{array[0].title}</div>
        </Link>
        <Link href={`${array[1]._id}`}>
          <div className={styles.recentArticle}>{array[1].title}</div>
        </Link>
        <Link href={`${array[2]._id}`}>
          <div className={styles.recentArticle}>{array[2].title}</div>
        </Link>
      </div>
    </Fragment>
  );
};

export default Recent;
