import { useEffect, useState } from "react";
import { fetchWithTopic } from "../../api/fetch-api.js";
import ArticleList from "../ArticleList/ArticleList.jsx";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setArticles([]);
        setError(false);
        setLoading(true);

        const res = await fetchWithTopic("react");
        setArticles(res);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {error && <p>Something went wrong, please try again later.</p>}
      {articles.length > 0 && <ArticleList articles={articles} />}
    </div>
  );
}

export default App;
