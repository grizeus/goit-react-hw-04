import styles from "./ImageCard.module.css";

const ImageCard = ({ alt, created, likes, user, urls }) => {
  const dateObj = new Date(created);
  const date = dateObj.toLocaleDateString();
  return (
    <div className={styles["gallery-item"]}>
      <a href={urls.regular} target="_blank">
        <div className={styles["img-wrapper"]}>
          <img className={styles["gallery-image"]} src={urls.small} alt={alt} />
        </div>
      </a>
      <ul className={styles["gallery-item-info"]}>
        <li>
          <b>Likes</b>
          {likes}
        </li>
        <li>
          <b>Author</b>
          {user.name}
        </li>
        <li>
          <b>Created</b>
          {date}
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
