import Layout from "../../Components/Layout/Layout";
import styles from "./singlePage.module.css";
import PostBody from "../../Components/Blog/PostBody/PostBody";
import HeaderDisplay from "../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";
import { Fragment } from "react";
import axios from "axios";

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
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/posts/-MXOUrJ6usAbNAqgoio9.json"
  );
  finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));

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
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/posts/-MXOUrJ6usAbNAqgoio9.json"
  );
  finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));
  const dynamicPaths = finalPosts.map((item, index) => {
    return { params: { pid: item._id } };
  });

  return {
    paths: dynamicPaths,
    fallback: "blocking",
  };
}

export default Display;
