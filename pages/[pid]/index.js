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
  const tagline = posts.tagline;
  const img600 = posts.img600;
  const img300 = posts.img300;
  const mainImgAlt = posts.mainImgAlt;

  let display = (
    <Layout title={title} description={tagline}>
      <article className={styles.singlePost}>
        <HeaderDisplay
          author={author}
          title={title}
          tags={tags}
          mainImg={mainImg}
          img600={img600}
          img300={img300}
          mainImgAlt={mainImgAlt}
        />
        <PostBody body={body} quip={quip} />
      </article>
    </Layout>
  );

  return <Fragment>{display}</Fragment>;
};

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.pid;
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json"
  );
  //finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));
  finalPosts = Object.entries(finalPosts.data);

  const dataFinal = finalPosts.filter((item, index) => {
    return item[0] === id;
  });
  if (dataFinal.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: dataFinal[0][1],
    },
    notFound: false,
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json"
  );
  //finalPosts = await JSON.parse(JSON.stringify(finalPosts.data));
  finalPosts = Object.entries(finalPosts.data);

  const dynamicPaths = finalPosts.map((item, index) => {
    return { params: { pid: item[0] } };
  });

  return {
    paths: dynamicPaths,
    fallback: "blocking",
  };
}

export default Display;
