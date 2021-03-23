import Layout from "../../Components/Layout/Layout";
import styles from "./chron.module.css";
import { useEffect, useState } from "react";

const chron = (props) => {
  const [display, setDisplay] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  console.log(`display aray: ${display}, year ${year}, month ${month}`);

  useEffect(() => {
    const filteredArray = props.posts.filter((item, index) => {
      return item.date.year === parseInt(year);
    });
    if (month) {
      const filteredArrayMonth = filteredArray.filter((item, index) => {
        return item.date.month === parseInt(month);
      });
      setDisplay(filteredArrayMonth);
      return;
    }
    setDisplay(filteredArray);
  }, [year, month]);

  const yearHandler = (e) => {
    setYear(e.target.id);
  };
  const monthHandler = (e) => {
    setMonth(e.target.id);
  };

  let content = <p>press a year</p>;
  if (display) {
    content = display.map((item, index) => {
      return (
        <li key={index}>
          <p>{item.title}</p>
        </li>
      );
    });
  }
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
          month === String(index)
            ? styles.monthButtonSelected
            : styles.monthButton
        }
        id={index}
        onClick={monthHandler}
        key={index}
      >
        {item}
      </button>
    );
  });

  return (
    <Layout>
      <section className={styles.dateSection}>
        <div className={styles.yearButtons}>
          <button
            className={
              year === "2021" ? styles.yearRadioSelected : styles.yearRadio
            }
            type="radio"
            id="2021"
            onClick={yearHandler}
          >
            2021
          </button>

          <button
            className={
              year === "2020" ? styles.yearRadioSelected : styles.yearRadio
            }
            id="2020"
            onClick={yearHandler}
          >
            2020
          </button>
        </div>
        <div className={styles.monthButtons}>{year ? monthButton : null}</div>
      </section>
      <section>
        <ul>{content}</ul>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  let data = await fetch("http://localhost:3000/api/hello");
  let dataFinal = await data.json();
  return {
    props: {
      posts: dataFinal,
    },
    revalidate: 1000,
    notFound: false,
  };
}

export default chron;
