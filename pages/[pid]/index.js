import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./singlePage.module.css";
import PostBody from "../../Components/Blog/PostBody/PostBody";
import HeaderDisplay from "../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";
import { Fragment } from "react";

const Display = (props) => {
  const posts = { ...props.post };
  const author = { ...posts.author };
  const tags = [...posts.tags];
  const title = posts.title;
  const quip = posts.quip;
  const mainImg = posts.mainImg;
  const body = posts.body;

  let display = (
    <Layout>
      <div className={styles.singlePost}>
        <HeaderDisplay
          author={author}
          title={title}
          tags={tags}
          mainImg={mainImg}
        />
        <PostBody body={body} quip={quip} />
      </div>
    </Layout>
  );

  return <Fragment>{display}</Fragment>;
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
      post: dataFinal[0],
    },
    notFound: false,
    revalidate: 10,
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
    fallback: false,
  };
}

export default Display;
