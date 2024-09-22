import { useState } from "react";
import { fetchImages } from "../../api/fetch-api.js";

import Button from "../Button/Button.jsx";
import Container from "../Container/Container.jsx";
import Error from "../Error/Error.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async query => {
    try {
      setImages([]);
      setPage(1);
      setError(false);
      setLoading(true);

      const results = await fetchImages(query, page, 20);
      setQuery(query);
      setImages(results);
      setPage(page + 1);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setError(false);
      setLoading(true);

      const results = await fetchImages(query, page, 20);
      setQuery(query);
      setImages(images.concat(results));
      setPage(page + 1);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container isSearch>
      <SearchHeader onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {images.length > 0 && <ImageGallery images={images} />}
      {page > 1 && (
        <Button isLoad onClick={() => handleLoadMore()}>
          Load More
        </Button>
      )}
    </Container>
  );
}

export default App;
