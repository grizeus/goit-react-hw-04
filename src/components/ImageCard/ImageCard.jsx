import clsx from "clsx";

import styles from "./ImageCard.module.css";

const ImageCard = ({ alt, created, likes, user, urls, modalHandler }) => {
  const dateObj = new Date(created);
  const date = dateObj.toLocaleDateString();
  return (
    <div className={styles["gallery-item"]}>
      <a
        href={urls.regular}
        target="_blank"
        rel="noreferrer"
        onClick={modalHandler}>
        <div className={styles["img-wrapper"]}>
          <img className={styles["gallery-image"]} src={urls.small} alt={alt} />
        </div>
      </a>
      <ul className={styles["gallery-item-info"]}>
        <li>
          <b>Likes</b>
          <p className={styles["gallery-item-descr"]}>{likes}</p>
        </li>
        <li>
          <b>Author</b>
          <p className={clsx(styles["gallery-item-descr"], styles["name"])}>
            {user.name}
          </p>
        </li>
        <li>
          <b>Created</b>
          <p className={styles["gallery-item-descr"]}>{date}</p>
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
