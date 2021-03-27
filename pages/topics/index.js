import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect-og";
import Post from "../../Models/postTwo";
import styles from "./topics.module.css";
import { useEffect, useState } from "react";

const Topics = (props) => {
  const [found, setFound] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (selected === "react") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("React");
      });
      setFound(display);
    }
    if (selected === "next") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Next");
      });
      setFound(display);
    }
    if (selected === "mongo") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Mongo");
      });
      setFound(display);
    }
    if (selected === "js") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Javascript");
      });
      setFound(display);
    }
    if (selected === "node") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Node");
      });
      setFound(display);
    }
    if (selected === "js") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Javascript");
      });
      setFound(display);
    }
  }, [selected]);

  const techHandler = (e) => {
    console.log(e.target.id);
    setSelected(e.target.id);
  };

  let display = null;
  if (found) {
    display = found.map((item, index) => {
      return <h1 key={item._id}>{item.title}</h1>;
    });
  }

  return (
    <Layout>
      <div className={styles.topicsMain}>
        <div className={styles.tags}>
          <img
            id="react"
            src="react.svg"
            onClick={techHandler}
            className={selected === "react" ? styles.tagSelected : styles.tag}
          />
          <img
            id="next"
            src="next.svg"
            onClick={techHandler}
            className={selected === "next" ? styles.tagSelected : styles.tag}
          />
          <img
            id="mongo"
            src="mongo.svg"
            onClick={techHandler}
            className={selected === "mongo" ? styles.tagSelected : styles.tag}
          />
          <img
            id="js"
            src="js.svg"
            onClick={techHandler}
            className={selected === "js" ? styles.tagSelected : styles.tag}
          />
          <img
            id="node"
            src="nodejs.svg"
            onClick={techHandler}
            className={selected === "node" ? styles.tagSelected : styles.tag}
          />
        </div>
        <div>{display}</div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const posts = await Post.find({});
  //stupid fix but it seems to be the one
  const finalPosts = JSON.parse(JSON.stringify(posts));
  return {
    props: {
      posts: finalPosts,
    },
  };
}

export default Topics;
