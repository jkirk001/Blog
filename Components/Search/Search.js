import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults/SearchResults";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(0);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (!props.data) return;
    if (searchInput === "") return;
    const timer = setTimeout(() => {
      const searchResultFinal = props.data.filter((item, index) => {
        let re = new RegExp(`\\b(${searchInput.toLowerCase()})\\b`);

        const found = item.title.toLowerCase().search(re);

        if (found === -1) return false;
        return true;
      });
      setSearchResult(searchResultFinal);
    }, 500);
    setSearchTimeout(timer);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <section className={styles.search}>
      <h2>Search</h2>
      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="search for a post..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          height="45"
          width="340"
        />
      </form>
      <SearchResults results={searchResult} />
    </section>
  );
};

export default Search;
