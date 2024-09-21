import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value.trim();

    if (topic === "") {
      alert("Please enter a topic");
      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css["search-form"]}>
      <input className={css.input} type="text" name="topic" placeholder="Search for a topic" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
