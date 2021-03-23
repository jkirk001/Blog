import Layout from "../../Components/Layout/Layout";

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
  let data = await fetch("http://localhost:3000/api/hello");
  let dataJson = await data.json();
  const dataFinal = dataJson.filter((item, index) => {
    return item.id === id;
  });
  return {
    props: {
      post: dataFinal[0],
    },
    revalidate: 1000,
    notFound: false,
  };
}
export async function getStaticPaths() {
  const data = await fetch("http://localhost:3000/api/hello");
  const dataJson = await data.json();
  const dynamicPaths = dataJson.map((item, index) => {
    return { params: { pid: item.id } };
  });
  return {
    paths: dynamicPaths,
    fallback: true,
  };
}

export default postPage;
