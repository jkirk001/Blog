import Layout from "../../Components/Layout/Layout";
import styles from "./chron.module.css";
import { useEffect, useState } from "react";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import LinkCardRow from "../../Components/UI/CardDisplay/LinkCardRow/LinkCardRow";
import insertionSort from "../../utils/insertionSort";
import TrailCol from "../../Components/UI/Animations/Trail-Col";

const chron = (props) => {
  const [display, setDisplay] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [open, set] = useState(true);

  useEffect(() => {
    //get isnertion sort to work correctly
    const orderedArr = insertionSort(props.posts);

    const filteredArray = orderedArr.filter((item, index) => {
      return parseInt(item.date.year) === parseInt(year);
    });

    if (month) {
      const filteredArrayMonth = filteredArray.filter((item, index) => {
        return parseInt(item.date.month - 1) === parseInt(month);
      });
      setDisplay(filteredArrayMonth.reverse());
      return;
    }
    //setDisplay(filteredArray);
    setDisplay(filteredArray.reverse());
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
      return <LinkCardRow key={index} data={item} />;
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
        <TrailCol open={open} onClick={() => set((state) => !state)}>
          {content}
        </TrailCol>
      </section>
    </Layout>
  );
};

//!Need to find a way to manupulate date in server end

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  const finalPosts = posts.map((item, index) => {
    const date = item.author.date.toLocaleDateString().split("/");
    item = item.toObject();
    const nearlyFinal = Object({
      ...item,
      date: {
        month: date[0],
        day: date[1],
        year: date[2],
      },
    });
    return nearlyFinal;
  });
  //stupid fix but it seems to be the one
  const finalPostsFormatted = JSON.parse(JSON.stringify(finalPosts));
  return {
    props: {
      posts: finalPostsFormatted,
    },
    revalidate: 10,
  };
}

export default chron;
