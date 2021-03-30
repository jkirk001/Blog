import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./singlePage.module.css";
import PostBody from "../../Components/Blog/PostBody/PostBody";
import HeaderDisplay from "../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";

const Display = (props) => {
  const post = props.posts;
  console.log(post);

  return (
    <Layout>
      <div className={styles.singlePost}>
        <HeaderDisplay data={post} />
        <PostBody data={post} />
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.pid;
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  const finalPosts = JSON.parse(JSON.stringify(posts));
  const dataFinal = finalPosts.filter((item, index) => {
    return String(item._id) === String(id);
  });
  return {
    props: {
      posts: dataFinal[0],
    },
  };
}

export async function getStaticPaths() {
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  const finalPosts = JSON.parse(JSON.stringify(posts));
  const dynamicPaths = finalPosts.map((item, index) => {
    return { params: { pid: String(item._id) } };
  });
  return {
    paths: dynamicPaths,
    fallback: true,
  };
}

export default Display;
