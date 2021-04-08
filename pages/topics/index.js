import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import styles from "./topics.module.css";
import { useEffect, useState } from "react";
import LinkCardRow from "../../Components/UI/CardDisplay/LinkCardRow/LinkCardRow";
import TrailCol from "../../Components/UI/Animations/Trail-Col";

const Topics = (props) => {
  const [found, setFound] = useState();
  const [selected, setSelected] = useState();
  const [open, set] = useState(true);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (selected === "react") {
      const display = props.posts.filter((item, index) => {
        return item.tags.includes("React");
      });
      setFound(display);
    }
    if (selected === "next") {
      setFound(null);
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
    if (e.target.id === selected) return;
    if (timer) clearTimeout(timer);
    set(false);
    let clickTimer = setTimeout(() => {
      setSelected(e.target.id);
      set(true);
    }, 700);
    setTimer(clickTimer);
  };

  let itemDisplay = null;
  if (found) {
    itemDisplay = found.map((item, index) => {
      //removed key for transition key={item._id}
      return <LinkCardRow data={item} />;
    });
  }

  return (
    <Layout
      title="Topical Search"
      description="Search through all Evron.dev posts by topic"
    >
      <div className={styles.topicsMain}>
        <div className={styles.tags}>
          <button>
            <img
              id="react"
              src="/devLogos/React.svg"
              onClick={techHandler}
              className={selected === "react" ? styles.tagSelected : styles.tag}
              alt="React logo press to show all react apps"
              aria-label="React logo press to show all react apps"
            />
          </button>
          <button>
            <img
              id="next"
              src="/devLogos/Next.svg"
              onClick={techHandler}
              className={selected === "next" ? styles.tagSelected : styles.tag}
              alt="Next logo press to show all next apps"
              aria-label="Next logo press to show all next apps"
            />
          </button>
          <button>
            <img
              id="mongo"
              src="/devLogos/Mongo.svg"
              onClick={techHandler}
              className={selected === "mongo" ? styles.tagSelected : styles.tag}
              alt="Mongo logo press to show all mongo apps"
              aria-label="Mongo logo press to show all mongo apps"
            />
          </button>
          <button>
            <img
              id="js"
              src="/devLogos/JS.svg"
              onClick={techHandler}
              className={selected === "js" ? styles.tagSelected : styles.tag}
              alt="Javacript logo press to show all javascript apps"
              aria-label="Javacript logo press to show all javascript apps"
            />
          </button>
          <button>
            <img
              id="node"
              src="/devLogos/Node.svg"
              onClick={techHandler}
              className={selected === "node" ? styles.tagSelected : styles.tag}
              alt="Node logo press to show all node apps"
              aria-label="Node logo press to show all node apps"
            />
          </button>
          <button>
            <img
              id="express"
              src="/devLogos/Express.svg"
              onClick={techHandler}
              className={
                selected === "express" ? styles.tagSelected : styles.tag
              }
              alt="Express logo press to show all express apps"
              aria-label="Express logo press to show all express apps"
            />
          </button>
        </div>
        <div className={styles.display}>
          <TrailCol open={open} onClick={() => set((state) => !state)}>
            {itemDisplay ? itemDisplay.reverse() : null}
          </TrailCol>
        </div>
      </div>
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
  return {
    props: {
      posts: finalPosts,
    },
    revalidate: 100,
  };
}

export default Topics;
