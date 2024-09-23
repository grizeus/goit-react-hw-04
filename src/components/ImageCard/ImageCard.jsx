import { useState } from "react";
import clsx from "clsx";

import Modal from "react-modal";

import styles from "./ImageCard.module.css";

Modal.setAppElement("#root");

const ImageCard = ({ alt, created, likes, user, urls }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
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

  const dateObj = new Date(created);
  const date = dateObj.toLocaleDateString();
  return (
    <div className={styles["gallery-item"]}>
      <div className={styles["img-wrapper"]}>
        <img
          className={styles["gallery-image"]}
          src={urls.small}
          alt={alt}
          onClick={handleModalOpen}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onAfterOpen={afterOpenModal}
          onAfterClose={afterCloseModal}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}>
          <div className={clsx(styles["img-wrapper"], styles["modal"])}>
            <img
              className={styles["gallery-image"]}
              src={urls.regular}
              onClick={handleModalClose}
            />
          </div>
        </Modal>
      </div>
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
