import Layout from "../../Components/Layout/Layout";
import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [submitObj, setSubmitObj] = useState({
    author: "",
    title: "",
    quip: "",
  });
  const [body, setBody] = useState(Array(2));
  const [bodyInputs, setBodyInputs] = useState(1);
  const [displayBodyInputs, setBI] = useState([]);

  useEffect(() => {
    let item = (
      <div key={bodyInputs} onChange={bodyInputHandler}>
        <select id="type" name={bodyInputs}>
          <option value="p">paragraph</option>
          <option value="img">image</option>
          <option value="code">code</option>
        </select>
        <input
          id="postValue"
          name={bodyInputs}
          value={body[bodyInputs].content}
          type="text"
          onChange={bodyInputHandler}
        />
      </div>
    );
    setBI((prevState) => {
      return [...prevState, item];
    });
    setBody(Array(bodyInputs));
  }, [bodyInputs]);

  const addInputHandler = (e) => {
    e.preventDefault();
    setBodyInputs((prevState) => {
      return prevState + 1;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(submitObj);
  };
  const bodyInputHandler = (e, num) => {
    if (e.target.id === "type") {
      setBody((prevState) => {
        let state = prevState[e.target.name];
        state.type = e.target.value;
        prevState[e.target.name] = state;
        return prevState;
      });
    }
    if (e.target.id === "postValue") {
      setBody((prevState) => {
        let state = prevState[e.target.name];
        state.content = e.target.value;
        prevState[e.target.name] = state;
        return prevState;
      });
    }
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
          <div>{displayBodyInputs}</div>
          <button>Submit</button>
        </form>
        <button onClick={addInputHandler}>lol +</button>
      </div>
    </Layout>
  );
};

export default Post;
