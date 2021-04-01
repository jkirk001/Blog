import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./singlePage.module.css";
import PostBody from "../../Components/Blog/PostBody/PostBody";
import HeaderDisplay from "../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";

const Display = (props) => {
  const post = props.posts[0];

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
  //const finalPosts = JSON.parse(JSON.stringify(posts));

  const finalPosts = posts.map((item) => {
    let finalPost = item.toObject();
    finalPost._id = finalPost._id.toString();
    finalPost.author.date = finalPost.author.date.toString();
    return finalPost;
  });
  const dataFinal = finalPosts.filter((item, index) => {
    return item._id === id;
  });
  if (dataFinal.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: dataFinal,
    },
    notFound: false,
  };
}

export async function getStaticPaths() {
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  //const finalPosts = JSON.parse(JSON.stringify(posts));

  const finalPosts = posts.map((item) => {
    let finalPost = item.toObject();
    finalPost._id = finalPost._id.toString();
    finalPost.author.date = finalPost.author.date.toString();
    return finalPost;
  });
  const dynamicPaths = finalPosts.map((item, index) => {
    return { params: { pid: item._id } };
  });
  return {
    paths: dynamicPaths,
    fallback: true,
  };
}

export default Display;
