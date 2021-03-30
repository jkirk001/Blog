import Layout from "../../Components/Layout/Layout";
import React, { useState, useEffect, useContext } from "react";
import { ModeContext } from "../../Context/context";
import { useRouter } from "next/router";
import styles from "./post.module.css";

const Post = (props) => {
  const mainContext = useContext(ModeContext);
  const router = useRouter();
  const [submitObj, setSubmitObj] = useState({
    author: "",
    title: "",
    quip: "",
    tags: [],
  });
  const [numTags, setNumTags] = useState(0);
  const [final, setFinal] = useState();

  useEffect(() => {
    if (final) {
      mainContext.submitDataSet(final);
      router.push({
        pathname: "/post/check",
      });
    }
    return;
  }, [final]);

  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const almostFinal = [];
    let group = 0;
    for (let i = 10; i < e.target.length - 1; i++) {
      if (i % 2 === 0) {
        almostFinal.push({ type: e.target[i].value });
      }
      if (i % 2 === 1) {
        console.log(e.target[i].value);
        almostFinal[group].content = e.target[i].value;
        group++;
      }
    }
    console.log(almostFinal);
    let final = {
      ...submitObj,
      body: almostFinal,
    };
    console.log(final);
    setFinal(final);
  };

  //switch to switch statement
  const mainInputCHangehandler = (e) => {
    if (e.target.id === "title") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, title: e.target.value };
        return state;
      });
    }
    if (e.target.id === "author") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, author: e.target.value };
        return state;
      });
    }
    if (e.target.id === "quip") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, quip: e.target.value };
        return state;
      });
    }
  };
  const numTagsHandler = (e) => {
    setNumTags(e.target.value);
  };

  const radioHandler = (e) => {
    console.log(e);
    if (e.target.checked) {
      setSubmitObj((prevState) => {
        prevState.tags = [...prevState.tags, e.target.value];
        return prevState;
      });
    }
    if (!e.target.checked) {
      setSubmitObj((prevState) => {
        prevState.tags = prevState.tags.filter((item) => {
          return item !== e.target.value;
        });
        return prevState;
      });
    }
  };

  // i guess the virtual dom sees only a few change, so it doesnt re-render items that stayw
  let displayBodyInputs = [];

  if (numTags) {
    for (let i = 0; i < numTags; i++) {
      displayBodyInputs.push(
        <div style={{ width: "700px" }}>
          <select>
            <option value="p">p</option>
            <option value="img">img</option>
            <option value="code">code</option>
          </select>
          <textarea
            style={{ minWidth: "700px", maxWidth: "700px" }}
            id={`bi${i}`}
            type="text"
          />
        </div>
      );
    }
  }

  return (
    <Layout>
      <div className={styles.postContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          <label htmlFor="title">Author </label>
          <select
            id="author"
            onChange={mainInputCHangehandler}
            value={submitObj.author}
          >
            <option value=""></option>
            <option value="jon">Jon</option>
            <option value="mikey">Mikey</option>
          </select>
          <label htmlFor="title">Title </label>
          <input
            id="title"
            type="text"
            placeholder="title"
            value={submitObj.title}
            onChange={mainInputCHangehandler}
          ></input>
          <label htmlFor="title">Quip </label>
          <input
            id="quip"
            type="text"
            placeholder="quip"
            value={submitObj.quip}
            onChange={mainInputCHangehandler}
          ></input>
          <div className={styles.techs}>
            <label htmlFor="react">React</label>
            <input
              type="checkbox"
              value="React"
              id="react"
              onChange={radioHandler}
            />
            <label htmlFor="next">Next</label>
            <input
              type="checkbox"
              value="Next"
              id="next"
              onChange={radioHandler}
            />
            <label htmlFor="node">Node</label>
            <input
              type="checkbox"
              value="Node"
              id="node"
              onChange={radioHandler}
            />
            <label htmlFor="js">JS</label>
            <input type="checkbox" value="JS" id="js" onChange={radioHandler} />
            <label htmlFor="express">Express</label>
            <input
              type="checkbox"
              value="Express"
              id="express"
              onChange={radioHandler}
            />
            <label htmlFor="mongo">Mongo</label>
            <input
              type="checkbox"
              value="Mongo"
              id="mongo"
              onChange={radioHandler}
            />
          </div>

          <div>
            <label htmlFor="numTags">How many Tags?</label>
            <input
              id="numTags"
              type="number"
              min="0"
              onChange={numTagsHandler}
            ></input>
          </div>

          <div>{displayBodyInputs}</div>
          <button>Submit Form</button>
        </form>
      </div>
    </Layout>
  );
};

export default Post;
