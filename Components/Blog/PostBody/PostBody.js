import styles from "./PostData.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
const PostBody = (props) => {
  console.log(props.data);
  const display = props.data.body.map((item, index) => {
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
    if (item.type === "sub") {
      return <h2 key={index}>{item.content}</h2>;
    }
  });
  console.log(display);
  return (
    <div className={styles.postMain}>
      <span className={styles.postQuote}>"{props.data.quip}"</span>
      {display}
    </div>
  );
};

export default PostBody;
