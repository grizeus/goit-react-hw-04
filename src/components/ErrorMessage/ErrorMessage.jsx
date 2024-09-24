import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return <p className={styles.error}>Something went wrong, please try again later.</p>;
};

export default ErrorMessage;
