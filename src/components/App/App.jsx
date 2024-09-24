import { lazy, useEffect, useState, Suspense } from "react";
import { fetchImages } from "../../api/fetch-api.js";

import Container from "../Container/Container.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../Loader/Loader.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";
const SearchBar = lazy(() => import("../SearchBar/SearchBar.jsx"));
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery.jsx"));


function App() {
  const PER_PAGE = 12;

  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
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

      const { total, total_pages, results } = await fetchImages(
        query,
        page,
        PER_PAGE
      );
      if (total > 0) {
        setMaxPages(total_pages);
        setQuery(query);
        setImages(results);
        setPage(page + 1);
      }
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

      const { results } = await fetchImages(query, page, PER_PAGE);
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
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar onSearch={handleSearch} />
        <Wrapper>
          {loading && page === 1 && <Loader />}
          {error && <ErrorMessage />}
        </Wrapper>
        {images.length > 0 && <ImageGallery images={images} />}
      </Suspense>
      {page > 1 && page < maxPages && (
        <Wrapper>
          {loading && <Loader />}
          <LoadMoreBtn handleLoadMore={handleLoadMore} />
        </Wrapper>
      )}
    </Container>
  );
}

export default App;
