import styles from "./Recent.module.css";
import { Fragment } from "react";
import insertionSort from "../../utils/insertionSort";
import LinkCard from "../../Components/UI/CardDisplay/LinkCard/LinkCard";
import { useState } from "react";
import Trail from "../UI/Animations/Trail";

const Recent = (props) => {
  const [open, set] = useState(true);

  const { data } = props;
  let array = [];
  if (data) {
    array = insertionSort(data);
    array = array.slice(array.length - 3, array.length).reverse();
  }

  const display = array.map((item, index) => {
    return <LinkCard data={item} key={item._id} />;
  });

  return (
    <Fragment>
      <h2>Recent</h2>
      <div className={styles.recent}>
        <Trail open={open} onClick={() => set((state) => !state)}>
          {display}
        </Trail>
      </div>
    </Fragment>
  );
};

export default Recent;
