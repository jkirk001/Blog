import styles from "./icons.module.css";

const Icons = (props) => {
  const icons = props.data.map((item, index) => {
    return (
      <img className={styles.img} key={index} src={`/devLogos/${item}.svg`} />
    );
  });

  return (
    <div
      className={
        props.type === "blog"
          ? styles.iconContainer
          : styles.iconContainerRecent
      }
    >
      {icons}
    </div>
  );
};

export default Icons;
