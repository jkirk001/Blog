import styles from "./PostData.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
const PostBody = (props) => {
  const { body, quip } = props;
  const display = body.map((item, index) => {
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
      return <img key={index} src={`${item.content}`} alt={item.alt} />;
    }
    if (item.type === "sub") {
      return <h2 key={index}>{item.content}</h2>;
    }
  });
  return (
    <div className={styles.postMain}>
      <span className={styles.postQuote}>"{quip}"</span>
      {display}
    </div>
  );
};

export default PostBody;
