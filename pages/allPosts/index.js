import Layout from "../../Components/Layout/Layout";
import LinkCardRow from "../../Components/UI/CardDisplay/LinkCardRow/LinkCardRow";
import styles from "./allPosts.module.css";
import axios from "axios";

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
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/posts/-MXOUrJ6usAbNAqgoio9.json"
  );
  console.log(finalPosts.data.object);
  finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));
  return {
    props: {
      posts: finalPosts,
    },
    revalidate: 100,
  };
}

export default allPosts;
