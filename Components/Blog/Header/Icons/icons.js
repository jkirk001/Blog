import styles from "./icons.module.css";

const Icons = (props) => {
  const icons = props.data.map((item, index) => {
    return <img className={styles.img} key={index} src={`/${item}.svg`} />;
  });

  return <div>{icons}</div>;
};

export default Icons;
