import Button from "../Button/Button.jsx";

import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
  return <Button className={css["load-more-btn"]} handleClick={handleLoadMore}>Load More</Button>;
};

export default LoadMoreBtn;
