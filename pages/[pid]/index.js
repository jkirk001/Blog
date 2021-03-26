import styles from "./singlePage.module.css";
import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Post from "../../Models/postTwo";

import { CopyBlock, dracula } from "react-code-blocks";

const postPageTest = (props) => {
  const post = props.posts;
  console.log(props);
  const readTime = 4;

  const display = post.body.map((item, index) => {
    if (item.type === "p") {
      return <p key={index}>{item.content}</p>;
    }
    if (item.type === "code") {
      return (
        <CopyBlock
          key={index}
          text={item.content}
          language={"jsx"}
          theme={dracula}
          codeBlock
        />
      );
    }

    if (item.type === "img") {
      return <img key={index} src={`${item.content}`} />;
    }
  });

  return (
    <Layout>
      <div className={styles.singlePost}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.info}>
          <img src={post.mainImg} />
          <div className={styles.authorInfo}>
            <span>
              <img src="https://res.cloudinary.com/dxtqihvgt/image/upload/v1616627732/face_oromjs.png"></img>
            </span>
            <span>Author: Jon Evron</span>
            <span>Date: 3/22/2021</span>
            <span>{readTime} Minute Read</span>
          </div>
        </div>
        <div className={styles.postMain}>
          <span className={styles.postQuote}>{post.quip}</span>
          {display}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.pid;
  await dbConnect();
  const posts = await Post.find({});
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
  const posts = await Post.find({});
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

export default postPageTest;
