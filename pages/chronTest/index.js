import Layout from "../../Components/Layout/Layout";
import styles from "./chron.module.css";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import LinkCardRow from "../../Components/UI/LinkCard/LinkCardRow/LinkCardRow";
import DateMenu from "../../Components/UI/DateMenu/DateMenu";
import { ChronContext } from "../../Context/chronContext";
import { useContext } from "react";

const chronTest = (props) => {
  const chronContext = useContext(ChronContext);

  let content = <p>press a year</p>;
  console.log(chronContext.display);
  if (chronContext.display.length > 1) {
    content = chronContext.display.map((item, index) => {
      return <LinkCardRow key={index} data={item} />;
    });
  }

  return (
    <Layout>
      <DateMenu data={props.posts} />
      <section className={styles.contentContainer}>{content}</section>
    </Layout>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  console.log(posts);
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
  };
}

export default chronTest;
