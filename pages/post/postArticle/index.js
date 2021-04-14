import Layout from "../../../Components/Layout/Layout";
import React, { useState, useEffect, useContext } from "react";
import { ModeContext } from "../../../Context/context";
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
    mainImg: "",
    mainImgAlt: "",
    img600: "",
    img300: "",
    tagline: "",
  });
  const [numTags, setNumTags] = useState(0);
  const [final, setFinal] = useState();

  useEffect(() => {
    if (
      !localStorage.getItem(process.env.cookie) ||
      !localStorage.getItem(process.env.cookie) === process.env.secret
    ) {
      console.log(
        localStorage.getItem(process.env.cookie) === process.env.secret
      );
      return router.push("/post");
    }
    return;
  }, []);

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
    e.preventDefault();
    const almostFinal = [];
    let group = 0;
    for (let i = 16; i < e.target.length - 1; i++) {
      if (i % 2 === 0) {
        almostFinal.push({ type: e.target[i].value });
      }
      if (i % 2 === 1) {
        almostFinal[group].content = e.target[i].value;
        group++;
      }
    }
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
    if (e.target.id === "mainImg") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, mainImg: e.target.value };
        return state;
      });
    }
    if (e.target.id === "mainImgAlt") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, mainImgAlt: e.target.value };
        return state;
      });
    }
    if (e.target.id === "img300") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, img300: e.target.value };
        return state;
      });
    }
    if (e.target.id === "img600") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, img600: e.target.value };
        return state;
      });
    }
    if (e.target.id === "tagline") {
      setSubmitObj((prevState) => {
        let state = { ...prevState, tagline: e.target.value };
        return state;
      });
    }
  };
  const numTagsHandler = (e) => {
    setNumTags(e.target.value);
  };

  const checkboxHandler = (e) => {
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
            <option value="sub">sub-title</option>
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
    <Layout title="Post Private">
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
          <label htmlFor="mainImg">Main Img </label>
          <input
            id="mainImg"
            type="text"
            placeholder="mainImg"
            value={submitObj.mainImg}
            onChange={mainInputCHangehandler}
          ></input>
          <label htmlFor="mainImg">Main Img Alt Text</label>
          <input
            id="mainImgAlt"
            type="text"
            placeholder="mainImgAlt"
            value={submitObj.mainImgAlt}
            onChange={mainInputCHangehandler}
          ></input>
          <label htmlFor="img600 ">img600</label>
          <input
            id="img600"
            type="text"
            placeholder="img600"
            value={submitObj.img600}
            onChange={mainInputCHangehandler}
          ></input>
          <label htmlFor="img300">img300</label>
          <input
            id="img300"
            type="text"
            placeholder="img300"
            value={submitObj.img300}
            onChange={mainInputCHangehandler}
          ></input>
          <label htmlFor="tagline">tagline</label>
          <input
            id="tagline"
            type="text"
            placeholder="tagline"
            value={submitObj.tagline}
            onChange={mainInputCHangehandler}
          ></input>
          {/* Hidden array used to even out loop */}
          <input id="hidden" type="hidden" />
          <div className={styles.techs}>
            <label htmlFor="react">React</label>
            <input
              type="checkbox"
              value="React"
              id="react"
              onChange={checkboxHandler}
            />
            <label htmlFor="next">Next</label>
            <input
              type="checkbox"
              value="Next"
              id="next"
              onChange={checkboxHandler}
            />
            <label htmlFor="node">Node</label>
            <input
              type="checkbox"
              value="Node"
              id="node"
              onChange={checkboxHandler}
            />
            <label htmlFor="js">JS</label>
            <input
              type="checkbox"
              value="JS"
              id="js"
              onChange={checkboxHandler}
            />

            <label htmlFor="html5">Html5</label>
            <input
              type="checkbox"
              value="Html5"
              id="html5"
              onChange={checkboxHandler}
            />
            <label htmlFor="css3">Css3</label>
            <input
              type="checkbox"
              value="Css3"
              id="css3"
              onChange={checkboxHandler}
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
