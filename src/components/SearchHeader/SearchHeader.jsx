import Button from "../Button/Button.jsx";

import css from "./SearchHeader.module.css";

const SearchHeader = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const query= form.elements.query.value.trim();

    if (query === "") {
      alert("Please enter a query");
      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={css["search-form"]}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button type="submit" isSearch>
          Search
        </Button>
      </form>
    </header>
  );
};

export default SearchHeader;
