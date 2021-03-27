import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "./singlePage.module.css";
import { CopyBlock, dracula } from "react-code-blocks";

function Check() {
  const [submit, setSubmit] = useState();
  const router = useRouter();

  useEffect(() => {
    const nearlyFinal = Object.keys(router.query);
    const data = JSON.parse(nearlyFinal[0]);
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
    </Layout>
  );
}
export default Check;
