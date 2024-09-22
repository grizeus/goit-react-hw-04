import { useEffect, useState } from "react";
import { fetchImages } from "../../api/fetch-api.js";

import Button from "../Button/Button.jsx";
import Container from "../Container/Container.jsx";
import Error from "../Error/Error.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";
import { TailSpin } from "react-loader-spinner";

import "./App.css";
import Wrapper from "../Wrapper/Wrapper.jsx";

function App() {
  const PER_PAGE = 12;
  const SPINNER_COLOR = "#4e75ff";

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title =
      query === "" ? "Search images" : `Unsplash "${query}" p.${page - 1}`;
  }, [query, page]);

  const handleSearch = async query => {
    try {
      setImages([]);
      setPage(1);
      setError(false);
      setLoading(true);

      const results = await fetchImages(query, page, PER_PAGE);
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

      const results = await fetchImages(query, page, PER_PAGE);
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
      <Wrapper>
        {loading && page === 1 && <TailSpin color={SPINNER_COLOR} />}
        {error && <Error />}
      </Wrapper>
      {images.length > 0 && <ImageGallery images={images} />}
      {page > 1 && (
        <Wrapper>
          {loading && <TailSpin color={SPINNER_COLOR} />}
          <Button isLoad onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </Wrapper>
      )}
    </Container>
  );
}

export default App;
