import Layout from "../../Components/Layout/Layout";
import LinkCardRow from "../../Components/UI/CardDisplay/LinkCardRow/LinkCardRow";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./allPosts.module.css";

const allPosts = (props) => {
  const { posts } = props;
  const display = posts.map((item) => {
    return <LinkCardRow key={item._id} data={item} />;
  });
  return (
    <Layout>
      <h2>All Posts -- Newest To Oldest</h2>
      <div className={styles.listAll}>{display}</div>
    </Layout>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  //const finalPosts = JSON.parse(JSON.stringify(posts));

  //?It cant parse non-seralizable data -- must expand nested objects, this is more explicit
  const finalPosts = posts.map((item) => {
    let finalPost = item.toObject();
    finalPost._id = finalPost._id.toString();
    finalPost.author.date = finalPost.author.date.toString();
    return finalPost;
  });
  return {
    props: {
      posts: finalPosts,
    },
    revalidate: 10,
  };
}

export default allPosts;
