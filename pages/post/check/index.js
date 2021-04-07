import { useContext, useState, useEffect } from "react";
import HeaderDisplay from "../../../Components/Blog/Header/HeaderDisplay/HeaderDisplay";
import PostBody from "../../../Components/Blog/PostBody/PostBody";
import Layout from "../../../Components/Layout/Layout";
import { ModeContext } from "../../../Context/context";
import styles from "./singlePage.module.css";
import post from "../../../utils/postData";

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
    await post(submitFinal);
    console.log("success");
  };

  return (
    <Layout title="Check Private">
      <div className={styles.singlePost}>
        <HeaderDisplay
          author={submit.author}
          title={submit.title}
          tags={submit.tags}
          mainImg={submit.mainImg}
        />
        <PostBody body={submit.body} quip={submit.quip} />
      </div>
      <button onClick={finalSubmitHandler}>Looks Good?</button>
    </Layout>
  );
};

export default Check;
