import Layout from "../../Components/Layout/Layout";
import styles from "./chron.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import dbConnect from "../../utils/db-connect-og";
import Blog from "../../Models/blogpost";

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
    if (month) {
      setMonth();
      setYear(e.target.id);
    }
    setYear(e.target.id);
  };
  const monthHandler = (e) => {
    setMonth(e.target.id);
  };

  let content = <p>press a year</p>;
  if (display) {
    content = display.map((item, index) => {
      return (
        <li key={index} className={styles.contentItems}>
          <Link href={`/${item._id}`}>{item.title}</Link>
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
      <section className={styles.contentContainer}>
        <ul className={styles.content}>{content}</ul>
      </section>
    </Layout>
  );
};

//!Need to find a way to manupulate date in server end

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  const finalPosts = [];
  for (let each of posts) {
    const date = each.author.date.toLocaleString();
    const values = date.split("/");
    const month = values[0];
    const day = values[1];
    const almostYear = values[2];
    const year = almostYear.split(",")[0];
    const finalDate = {
      year,
      month,
      day,
    };
    let finalEach = { ...each, ...each.author };
    finalEach.author.date = finalDate;

    finalPosts.push(finalEach);
  }
  console.log(finalPosts);
  //stupid fix but it seems to be the one
  const finalPostsFormatted = JSON.parse(JSON.stringify(finalPosts));
  return {
    props: {
      posts: finalPostsFormatted,
    },
  };
}

export default chron;
