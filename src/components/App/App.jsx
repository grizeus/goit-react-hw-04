import { lazy, useEffect, useState, Suspense } from "react";
import { fetchImages } from "../../api/fetch-api.js";
import Modal from "react-modal";

import Container from "../Container/Container.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../Loader/Loader.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";
const SearchBar = lazy(() => import("../SearchBar/SearchBar.jsx"));
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery.jsx"));

Modal.setAppElement("#root");

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

  const handleModalOpen = e => {
    e.preventDefault();
    setIsModalOpen(true);
    setModalProps({ src: e.currentTarget.href, alt: e.target.alt });
  };

  const afterOpenModal = () => {
    document.body.style.overflow = "hidden";
  };

  const afterCloseModal = () => {
    document.body.style.overflow = "auto";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container isSearch>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar onSearch={handleSearch} />
        <Wrapper>
          {isLoading && page === 1 && <Loader />}
          {isError && <ErrorMessage />}
        </Wrapper>
        {images.length > 0 && (
          <ImageGallery images={images} modalHandler={handleModalOpen} />
        )}
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={handleModalClose}
          onAfterClose={afterCloseModal}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
          contentLabel="Image Modal"
          closeTimeoutMS={200}>
          <ImageModal src={modalProps.src} alt={modalProps.alt} />
        </Modal>
      </Suspense>
      {page > 1 && page < maxPages && (
        <Wrapper>
          {isLoading && <Loader />}
          <LoadMoreBtn handleLoadMore={handleLoadMore} />
        </Wrapper>
      )}
    </Container>
  );
}

export default App;
