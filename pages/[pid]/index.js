import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Post from "../../Models/post";

const postPage = (props) => {
  const readWPM = 275;
  const readTime = Math.round(props.post.body.length / readWPM);
  return (
    <Layout>
      <h2>{props.post.title}</h2>
      <div>{`${props.post.date.month}/${props.post.date.day}/${props.post.date.year}`}</div>
      <div>{readTime} minute read</div>
      <p>{props.post.body}</p>
      <p>Tags : [{`${props.post.tag}`}]</p>
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
