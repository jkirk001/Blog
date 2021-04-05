import Layout from "../Components/Layout/Layout";
import Search from "../Components/Search/Search";
import Recent from "../Components/Recent/Recent";
import React, { useContext } from "react";
import { ModeContext } from "../Context/context";
import axios from "axios";

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
  let finalPosts = await axios.get(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json"
  );
  //finalPosts = await JSON.parse(JSON.stringify(finalPosts.data.object));
  finalPosts = Object.entries(finalPosts.data);
  finalPosts = finalPosts.map((item, index) => {
    item[1]._id = item[0];
    item = item[1];
    return item;
  });
  console.log(finalPosts);
  return {
    props: {
      posts: finalPosts,
    },
    revalidate: 100,
  };
}
//Testing new branch TEST

export default Home;
