import styles from "./ImageCard.module.css";

const ImageCard = ({ alt, created, likes, user, urls }) => {
  return (
    <div className={styles["gallery-item"]}>
      <a className={styles["gallery-image"]} href={urls.regular} target="_blank" rel="noopener noreferrer">
        <div className={styles["img-wrapper"]}>
          <img src={urls.small} alt={alt} />
        </div>
      </a>
      <ul className={styles["gallery-item-info"]}>
        <li><b>Likes:</b> {likes}</li>
        <li><b>User:</b> {user.name}</li>
        <li><b>Created:</b> {created}</li>
      </ul>
    </div>
  );
};

export default ImageCard;
