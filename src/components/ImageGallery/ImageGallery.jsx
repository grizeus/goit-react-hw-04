import ImageCard from "../ImageCard/ImageCard";

import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, modalHandler }) => {
  return (
    <section>
      <ul className={styles["gallery-list"]}>
        {images.map(
          ({ id, alt_description, created_at, likes, user, urls }) => (
            <li key={id}>
              <ImageCard
                id={id + "1"}
                alt={alt_description}
                created={created_at}
                likes={likes}
                user={user}
                urls={urls}
                modalHandler={modalHandler}
              />
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default ImageGallery;
