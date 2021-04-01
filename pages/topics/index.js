import Layout from "../../Components/Layout/Layout";
import dbConnect from "../../utils/db-connect";
import Blog from "../../Models/blogpost";
import styles from "./topics.module.css";
import { useEffect, useState } from "react";
import LinkCardRow from "../../Components/UI/LinkCard/LinkCardRow/LinkCardRow";

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
        return item.tags.includes("JS");
      });
      setFound(display);
    }
    if (selected === "node") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Node");
      });
      setFound(display);
    }
    if (selected === "express") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("Express");
      });
      setFound(display);
    }
  }, [selected]);

  const techHandler = (e) => {
    setSelected(e.target.id);
  };

  let display = null;
  if (found) {
    display = found.map((item, index) => {
      return <LinkCardRow data={item} key={item._id} />;
    });
  }

  return (
    <Layout>
      <div className={styles.topicsMain}>
        <div className={styles.tags}>
          <img
            id="react"
            src="/devLogos/React.svg"
            onClick={techHandler}
            className={selected === "react" ? styles.tagSelected : styles.tag}
          />
          <img
            id="next"
            src="/devLogos/Next.svg"
            onClick={techHandler}
            className={selected === "next" ? styles.tagSelected : styles.tag}
          />
          <img
            id="mongo"
            src="/devLogos/Mongo.svg"
            onClick={techHandler}
            className={selected === "mongo" ? styles.tagSelected : styles.tag}
          />
          <img
            id="js"
            src="/devLogos/JS.svg"
            onClick={techHandler}
            className={selected === "js" ? styles.tagSelected : styles.tag}
          />
          <img
            id="node"
            src="/devLogos/Node.svg"
            onClick={techHandler}
            className={selected === "node" ? styles.tagSelected : styles.tag}
          />
          <img
            id="express"
            src="/devLogos/Express.svg"
            onClick={techHandler}
            className={selected === "express" ? styles.tagSelected : styles.tag}
          />
        </div>
        <div className={styles.display}>{display}</div>
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
      posts: finalPosts,
    },
    revalidate: 10,
  };
}

export default Topics;
