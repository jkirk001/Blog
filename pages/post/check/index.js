import { useContext, useState, useEffect } from "react";
import HeaderDisplay from "../../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";
import PostBody from "../../../Components/Blog/PostBody/PostBody";
import Layout from "../../../Components/Layout/Layout";
import { ModeContext } from "../../../Context/context";
import styles from "./singlePage.module.css";

const Check = (props) => {
  const mainContext = useContext(ModeContext);
  const [submit, setSubmit] = useState();

  useEffect(() => {
    const data = mainContext.submitData;

    if (data.author === "jon") {
      data.author = { name: "Jon", date: new Date(Date.now()), read: 5 };
    }
    if (data.author === "mikey") {
      data.author = { name: "Mikey", date: new Date(Date.now()), read: 5 };
    }
    setSubmit(data);
  }, []);

  if (!submit) {
    return (
      <Layout>
        <div>lol</div>
      </Layout>
    );
  }

  const finalSubmitHandler = async (e) => {
    e.preventDefault();
    let submitFinal = JSON.stringify(submit);
    await fetch("http://localhost:3000/api/hello", {
      method: "POST",
      body: submitFinal,
    });
    console.log("success");
  };

  return (
    <Layout>
      <div className={styles.singlePost}>
        <HeaderDisplay data={submit} />
        <PostBody data={submit} />
      </div>
      <button onClick={finalSubmitHandler}>Looks Good?</button>
    </Layout>
  );
};

export default Check;
