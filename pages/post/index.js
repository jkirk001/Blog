//! REWORK ALL OF THIS TOMORROW !!!!!!!!!
//? Keep the submitObj
//? CHange how the the inputs relate to state, but keep it based on userInput for numTags
//? Fuck

import Layout from "../../Components/Layout/Layout";
import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [submitObj, setSubmitObj] = useState({
    author: "",
    title: "",
    quip: "",
  });
  const [body, setBody] = useState([]);
  const [bodyInputs, setBodyInputs] = useState(0);
  const [displayBodyInputs, setBI] = useState([]);

  console.log(`body: ${body.length}`);
  console.log(`bodyInputs: ${bodyInputs}`);
  console.log(`displayBodyInputs: ${displayBodyInputs.length}`);
  console.log("--------------------------");
  console.log("--------------------------");

  useEffect(() => {
    if (!bodyInputs) return;
    let item = (
      <div key={bodyInputs} onChange={null}>
        <select id="type" name={bodyInputs}>
          <option value="p">paragraph</option>
          <option value="img">image</option>
          <option value="code">code</option>
        </select>
        <input id="postValue" name={bodyInputs} type="text" onChange={null} />
      </div>
    );
    setBI((prevState) => {
      if (prevState.length < bodyInputs) {
        const finalItem = [...prevState];
        for (let i = prevState.length; i < bodyInputs; i++) {
          finalItem.push(item);
        }
        return finalItem;
      }
      if (bodyInputs < prevState.length) {
        for (let i = bodyInputs; i < prevState.length; i++) {
          prevState.pop();
        }

        return prevState;
      }
    });
  }, [bodyInputs]);

  const submitHandler = (e) => {
    e.preventDefault();
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
    const array = body;
    if (e.target.value > array.length) {
      for (let i = bodyInputs; i < e.target.value; i++) {
        array.push({
          type: "p",
          content: "",
        });
      }
    }

    if (e.target.value < array.length) {
      for (let i = e.target.value; i > bodyInputs; i--) {
        array.pop();
      }
    }

    setBody(array);
    setBodyInputs(e.target.value);
  };
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
            <input id="numTags" type="number" onChange={numTagsHandler}></input>
          </div>

          <div>{displayBodyInputs}</div>
          <button>Submit Form</button>
        </form>
      </div>
    </Layout>
  );
};

export default Post;
