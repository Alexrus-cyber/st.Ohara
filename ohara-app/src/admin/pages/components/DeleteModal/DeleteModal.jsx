import styles from "./DeleteModal.module.scss";
import React from "react";
import { useDispatch } from "react-redux";

export const DeleteModal = (props) => {
  const dispatch = useDispatch();

  const deleteCard = (yes) => {
    if (yes) {
      dispatch(props.delete(props.id));
      props.onClose();
    } else {
      props.onClose();
    }
  };

  return (
    <div className={styles.deleteModule}>
      <h1 className={styles.titleModule}>Вы уверены что хотите удалить?</h1>
      <div className={styles.buttonContainerM}>
        <button className={styles.yes} onClick={() => deleteCard(true)}>
          Да
        </button>
        <button className={styles.no} onClick={() => deleteCard(false)}>
          Нет
        </button>
      </div>
    </div>
  );
};
