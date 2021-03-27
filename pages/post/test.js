import Layout from "../../Components/Layout/Layout";
import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [submitObj, setSubmitObj] = useState({
    author: "",
    title: "",
    quip: "",
  });
  const [numTags, setNumTags] = useState(0);
  const [final, setFinal] = useState();

  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const almostFinal = [];
    let group = 0;
    for (let i = 4; i < e.target.length - 1; i++) {
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
  };

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

  //? why is this working?
  let displayBodyInputs = [];

  if (numTags) {
    for (let i = 0; i < numTags; i++) {
      displayBodyInputs.push(
        <div>
          <select>
            <option value="p">p</option>
            <option value="img">img</option>
            <option value="code">code</option>
          </select>
          <input id={`bi${i}`} type="text" />
        </div>
      );
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitHandler}>
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
