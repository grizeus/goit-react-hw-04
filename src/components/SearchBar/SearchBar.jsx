import toast, { Toaster } from "react-hot-toast";

import Button from "../Button/Button.jsx";

import css from "./SearchBar.module.css";

const SearchHeader = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();

    if (query === "") {
      toast.error("Please enter a search query");
      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <header>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <form onSubmit={handleSubmit} className={css["search-form"]}>
        <input
          className={css["search-input"]}
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
