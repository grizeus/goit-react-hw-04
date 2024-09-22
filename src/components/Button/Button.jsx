import clsx from "clsx";

import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button", isLoad=false, isSearch=false }) => {
  const classes = clsx(
    styles.btn,
    isSearch && styles["search"],
    isLoad && styles["load"]
  );
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
