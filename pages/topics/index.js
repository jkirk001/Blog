import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect-og";
import Post from "../../Models/postTwo";
import styles from "./topics.module.css";

const Topics = (props) => {
  console.log(props);
  return (
    <Layout>
      <div className={styles.topicsMain}>
        <div className={styles.tags}>
          <img src="react.svg" />
          <img src="next.svg" />
          <img src="mongo.svg" />
          <img src="js.svg" />
          <img src="nodejs.svg" />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const posts = await Post.find({});
  //stupid fix but it seems to be the one
  const finalPosts = JSON.parse(JSON.stringify(posts));
  return {
    props: {
      posts: finalPosts,
    },
  };
}

export default Topics;
