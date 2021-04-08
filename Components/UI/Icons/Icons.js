import styles from "./Icons.module.css";

const Icons = (props) => {
  const icons = props.data.map((item, index) => {
    return (
      <img
        className={styles.img}
        key={index}
        src={`/devLogos/${item}.svg`}
        width="50"
        height="50"
      />
    );
  });

  return <div className={styles.iconContainer}>{icons}</div>;
};

export default Icons;
