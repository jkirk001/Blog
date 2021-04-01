import dbConnect from "../utils/db-connect";
import Blog from "../Models/blogpost";
import Layout from "../Components/Layout/Layout";
import Search from "../Components/Search/Search";
import Recent from "../Components/Recent/Recent";
import React, { useContext } from "react";
import { ModeContext } from "../Context/context";

const Home = (props) => {
  //const { data } = useContext(ModeContext);
  return (
    <Layout>
      <Recent data={props.posts} />
      <Search data={props.posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const posts = await Blog.find({});
  //stupid fix but it seems to be the one
  //const finalPosts = JSON.parse(JSON.stringify(posts));

  //?It cant parse non-seralizable data -- must expand nested objects, this is more explicit
  const finalPosts = posts.map((item) => {
    let finalPost = item.toObject();
    finalPost._id = finalPost._id.toString();
    finalPost.author.date = finalPost.author.date.toString();
    return finalPost;
  });
  return {
    props: {
      posts: finalPosts,
    },
  };
}

export default Home;
