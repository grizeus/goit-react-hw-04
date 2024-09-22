import styles from "./Container.module.css";

import clsx from "clsx";

const Container = ({ children, isSearch=false }) => {
  return <div className={clsx(styles.container, isSearch && styles.search)}>{children}</div>;
};

export default Container;