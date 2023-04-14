import styles from "./Button.module.scss";

export const ButtonUI = ({ name, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {name}
    </button>
  );
};
