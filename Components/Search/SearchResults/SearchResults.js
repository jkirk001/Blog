import styles from "./SearchResults.module.css";
import LinkCardRow from "../../UI/CardDisplay/LinkCardRow/LinkCardRow";

const SearchResults = (props) => {
  let results = <li>Search for something</li>;
  if (props.results.length) {
    results = props.results.map((item, index) => {
      return <LinkCardRow data={item} key={item._id} />;
    });
  }
  return <div className={styles.display}>{results}</div>;
};
export default SearchResults;
