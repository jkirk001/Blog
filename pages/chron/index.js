import Layout from "../../Components/Layout/Layout";
import styles from "./chron.module.css";
import { useEffect, useState } from "react";
import LinkCardRow from "../../Components/UI/CardDisplay/LinkCardRow/LinkCardRow";
import insertionSort from "../../utils/insertionSort";
import TrailCol from "../../Components/UI/Animations/Trail-Col";
import axios from "axios";

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
    if (e.target.id === month) return;
    if (month) {
      set(false);
      setTimeout(() => {
        setMonth();
        setYear(e.target.id);
        set(true);
      }, 700);
    }
    if (!month) {
      set(false);
      setTimeout(() => {
        setYear(e.target.id);
        set(true);
      }, 700);
    }
  };
  const monthHandler = (e) => {
    if (e.target.id === month) return;
    if (e.target.id !== month) {
      set(false);
      setTimeout(() => {
        setMonth(e.target.id);
        set(true);
      }, 700);
    }
  };

  let content = <p>Nothing seems to be here :(</p>;
  if (display && display.length) {
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
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json"
  );
  //finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));
  finalPosts = Object.entries(finalPosts.data);
  finalPosts = finalPosts.map((item, index) => {
    item[1]._id = item[0];
    item = item[1];
    return item;
  });
  const finalPostsFINAL = finalPosts.map((item, index) => {
    let date = item.author.date.split("-");
    date[2] = date[2].split("T")[0];
    const nearlyFinal = Object({
      ...item,
      date: {
        month: date[1],
        day: date[2],
        year: date[0],
      },
    });
    return nearlyFinal;
  });

  return {
    props: {
      posts: finalPostsFINAL,
    },
    revalidate: 100,
  };
}

export default chron;
