import styles from "./recent.module.css";
import Link from "next/link";
import { Fragment } from "react";
import insertionSort from "../../utils/insertionSort";
import Icons from "../Blog/Header/Icons/icons";
import LinkCard from "../../Components/UI/LinkCard/LinkCard";

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

    return <LinkCard data={item} key={item._id} />;
  });

  return (
    <Fragment>
      <h2>Recent</h2>
      <div className={styles.recent}>{display}</div>
    </Fragment>
  );
};

export default Recent;
