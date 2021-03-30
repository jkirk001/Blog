import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./singlePage.module.css";
import Icons from "../../Components/Blog/Header/Icons/icons";
import Author from "../../Components/Blog/Header/Author/Author";
import PostBody from "../../Components/Blog/PostBody/PostBody";

const Display = (props) => {
  const post = props.posts;
  console.log(post);

  return (
    <Layout>
      <div className={styles.singlePost}>
        <h1 className={styles.title}>{post.title}</h1>
        <Icons data={post.tags} />
        <Author data={post.author} />
        <div className={styles.info}>
          <img src={post.mainImg ? post.mainImg : "/test.jpg"} />
        </div>
        <PostBody data={post} />
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
      posts: finalPosts[1],
    },
  };
}
export default Display;
