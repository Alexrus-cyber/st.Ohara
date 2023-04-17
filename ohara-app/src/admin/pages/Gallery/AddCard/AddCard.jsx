import styles from "./Card.module.scss";

export const AddCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.plus}>+</div>
    </div>
  );
};
