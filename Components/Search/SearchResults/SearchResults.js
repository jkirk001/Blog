import styles from "./SearchResults.module.css";
import Link from "next/link";

const SearchResults = (props) => {
  let results = <p>Search for something</p>;
  if (props.results.length) {
    results = props.results.map((item, index) => {
      return (
        <li key={item.id}>
          <Link href={`/${item.id}`}>{item.title}</Link>
        </li>
      );
    });
  }
  return <ul className={styles.displayResults}>{results}</ul>;
};
export default SearchResults;
