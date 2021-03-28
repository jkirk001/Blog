import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "./singlePage.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
import { ModeContext } from "../../Context/context";

function Check() {
  const mainContext = useContext(ModeContext);
  const [submit, setSubmit] = useState();

  useEffect(() => {
    console.log(mainContext.submitData);
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

  console.log(submit);

  const display = submit.body.map((item, index) => {
    if (item.type === "p") {
      return <p key={index}>{item.content}</p>;
    }
    if (item.type === "code") {
      return (
        <CopyBlock
          key={index}
          text={item.content}
          language={"jsx"}
          theme={dracula}
          codeBlock
        />
      );
    }

    if (item.type === "img") {
      return <img key={index} src={`${item.content}`} />;
    }
  });

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
        <h1 className={styles.title}>{submit.title}</h1>
        <div className={styles.info}>
          <img src="/test.jpg" />
          <div className={styles.authorInfo}>
            <span>
              <img src="https://res.cloudinary.com/dxtqihvgt/image/upload/v1616627732/face_oromjs.png"></img>
            </span>
            <span>Author: {submit.author.name}</span>
            <span>Date: {submit.author.date.toLocaleDateString("en-US")}</span>
            <span>{submit.author.read} Minute Read</span>
          </div>
        </div>
        <div className={styles.postMain}>
          <span className={styles.postQuote}>{submit.quip}</span>
          {display}
        </div>
      </div>

      <button onClick={finalSubmitHandler}>Looks Good?</button>
    </Layout>
  );
}
export default Check;
