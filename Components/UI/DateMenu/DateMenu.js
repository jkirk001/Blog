import { ChronContext } from "../../../Context/chronContext";
import { useContext, useEffect } from "react";
import styles from "./DateMenu.module.css";

const DateMenu = (props) => {
  const chronContext = useContext(ChronContext);
  useEffect(() => {
    chronContext.setInitialArray(props.data);
  }, []);

  const monthSpelled = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthButton = monthSpelled.map((item, index) => {
    return (
      <button
        className={
          chronContext.month === String(index)
            ? styles.monthButtonSelected
            : styles.monthButton
        }
        id={index}
        onClick={chronContext.setMonth}
        key={index}
      >
        {item}
      </button>
    );
  });
  return (
    <section className={styles.dateSection}>
      <div className={styles.yearButtons}>
        <button
          className={
            chronContext.year === "2021"
              ? styles.yearRadioSelected
              : styles.yearRadio
          }
          type="radio"
          id="2021"
          onClick={chronContext.setYear}
        >
          2021
        </button>

        <button
          className={
            chronContext.year === "2020"
              ? styles.yearRadioSelected
              : styles.yearRadio
          }
          id="2020"
          onClick={chronContext.setYear}
        >
          2020
        </button>
      </div>
      <div className={styles.monthButtons}>
        {chronContext.year ? monthButton : null}
      </div>
    </section>
  );
};

export default DateMenu;
