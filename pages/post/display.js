import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./singlePage.module.css";
import { CopyBlock, dracula } from "react-code-blocks";

const Display = (props) => {
  const post = props.posts;
  console.log(post);
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
          <img src={post.mainImg ? post.mainImg : "/test.jpg"} />
          <div className={styles.authorInfo}>
            <span>
              <img src="https://res.cloudinary.com/dxtqihvgt/image/upload/v1616627732/face_oromjs.png"></img>
            </span>
            <span>Author: Jon Evron</span>
            <span>Date: 3/22/2021</span>
            <span>{post.author.time} Minute Read</span>
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

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  const finalPosts = JSON.parse(JSON.stringify(posts));
  return {
    props: {
      posts: finalPosts[2],
    },
  };
}
export default Display;
