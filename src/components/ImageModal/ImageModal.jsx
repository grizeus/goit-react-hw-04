import styles from "./ImageModal.module.css";

const ImageModal = ({ src, alt }) => {
  return <img className={styles.modal} src={src} alt={alt} />;
};

export default ImageModal;
