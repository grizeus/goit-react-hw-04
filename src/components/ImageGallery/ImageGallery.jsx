import ImageCard from "../ImageCard/ImageCard";

import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles["gallery-list"]}>
      {images.map(({ id, alt_description, created_at, likes, user, urls }) => (
        <li key={id}>
          <ImageCard alt={alt_description} created={created_at} likes={likes} user={user} urls={urls} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
