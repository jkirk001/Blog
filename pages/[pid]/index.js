import styles from "./singlePage.module.css";
import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect-og";
import Post from "../../Models/post";
import { CopyBlock, a11yLight, sunburst } from "react-code-blocks";

const postPage = (props) => {
  const readWPM = 275;
  const readTime = Math.round(props.post.body.length / readWPM);
  const code = `
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
    if (dataFinal.length === 0) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post: dataFinal[0],
      },
      revalidate: 1000,
      notFound: false,
    };
  }`;
  return (
    <Layout>
      <div className={styles.singlePost}>
        <h1 className={styles.title}>
          {props.post.title} and more words to see the styling
        </h1>
        <div className={styles.info}>
          <img src="test.jpg" />
          <div className={styles.authorInfo}>
            <span>
              <img src="https://res.cloudinary.com/dxtqihvgt/image/upload/v1616627732/face_oromjs.png"></img>
            </span>
            <span>Author: Jon</span>
            <span>Date: 3/22/2021</span>
            <span>{readTime} Minute Read</span>
          </div>
        </div>
        <div className={styles.postMain}>
          <span className={styles.postQuote}>
            "Who would have thought there would be an intro quote to the
            article"
          </span>
          <p>{props.post.body}</p>
          <CopyBlock
            text={code}
            language={"javascript"}
            theme={a11yLight}
            codeBlock
          />
          <p>{props.post.body}</p>
          <p>Tags : [{`${props.post.tag}`}]</p>
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
  if (dataFinal.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: dataFinal[0],
    },
    revalidate: 1000,
    notFound: false,
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

export default postPage;
