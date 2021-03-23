import styles from "./Search.module.css";

const Search = (props) => {
  return (
    <div className={styles.search} onSubmit={(e) => e.preventDefault()}>
      <h2>Search</h2>
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="search for a post..."
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Search;
