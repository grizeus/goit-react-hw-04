import { useState } from "react";
import { fetchWithTopic } from "../../api/fetch-api.js";
import ArticleList from "../ArticleList/ArticleList.jsx";
import Error from "../Error/Error.jsx";
import Loader from "../Loader/Loader.jsx";
import "./App.css";
import SearchForm from "../SearchForm/SearchForm.jsx";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async topic => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);

      const hits = await fetchWithTopic(topic);
      setArticles(hits);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList articles={articles} />}
    </div>
  );
}

export default App;
