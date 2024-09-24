import clsx from "clsx";

import styles from "./Button.module.css";

const Button = ({
  children,
  className,
  type = "button",
  isSearch = false,
  handleClick,
}) => {
  const classes = clsx(styles.btn, isSearch && styles["search"], className);
  return (
    <button className={classes} type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
