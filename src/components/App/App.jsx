import { lazy, useEffect, useState, Suspense } from "react";
import { fetchImages } from "../../api/fetch-api.js";
import ReactModal from "react-modal";

import Container from "../Container/Container.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../Loader/Loader.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";
const SearchBar = lazy(() => import("../SearchBar/SearchBar.jsx"));
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery.jsx"));

ReactModal.setAppElement("#root");

function App() {
  const PER_PAGE = 12;

  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title =
      query === "" ? "Search images" : `Unsplash "${query}" p.${page - 1}`;
  }, [query, page]);

  const handleSetQuery = query => {
    setQuery(query);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setImages([]);
        setPage(1);
        setError(false);
        setLoading(true);

        const { total, total_pages, results } = await fetchImages(
          query,
          1,
          PER_PAGE
        );
        if (total > 0) {
          setMaxPages(total_pages);
          setImages(results);
        }
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query !== "") {
      handleSearch();
    }
  }, [query]);

  const incrementPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }
    (async () => {
      try {
        setError(false);
        setLoading(true);

        const { results } = await fetchImages(query, page, PER_PAGE);
        setImages(prevData => prevData.concat(results));
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, query]);

  const handleModalOpen = regularUrl => e => {
    e.preventDefault();
    setIsModalOpen(true);
    setModalProps({ src: regularUrl, alt: e.target.alt });
  };

  return (
    <Container isSearch>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar onSearch={handleSetQuery} />
        <Wrapper>
          {isLoading && page === 1 && <Loader />}
          {isError && <ErrorMessage />}
        </Wrapper>
        {images.length > 0 && (
          <ImageGallery images={images} modalHandler={handleModalOpen} />
        )}
        <ImageModal
          props={modalProps}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Suspense>
      {images.length > 0 && page < maxPages && (
        <Wrapper>
          {isLoading && <Loader />}
          <LoadMoreBtn handleLoadMore={incrementPage} />
        </Wrapper>
      )}
    </Container>
  );
}

export default App;
