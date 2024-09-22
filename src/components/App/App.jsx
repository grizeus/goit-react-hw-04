import { useState } from "react";
import { fetchImages } from "../../api/fetch-api.js";

import Container from "../Container/Container.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Error from "../Error/Error.jsx";
import Loader from "../Loader/Loader.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async topic => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);

      const results = await fetchImages(topic, 1);
      setImages(results);
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
      </Container>
  );
}

export default App;
