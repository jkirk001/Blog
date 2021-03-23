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
    const timer = setTimeout(() => {
      fetch("http://localhost:3000/api/hello")
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          const searchResultFinal = resData.filter((item, index) => {
            return searchInput === item.tag;
          });
          setSearchResult(searchResultFinal);
        });
    }, 3000);
    setSearchTimeout(timer);
  }, [searchInput]);

  return (
    <div className={styles.search}>
      <h2>Search</h2>
      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="search for a post..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      <SearchResults results={searchResult} />
    </div>
  );
};

export default Search;
