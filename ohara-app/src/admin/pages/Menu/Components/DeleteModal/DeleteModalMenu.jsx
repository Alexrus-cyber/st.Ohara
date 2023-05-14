import styles from "./DeleteModalMenu.module.scss";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

export const DeleteModalMenu = memo(({ onClose, id, ...props }) => {
  const dispatch = useDispatch();

  const deleteCard = (yes) => {
    if (yes) {
      dispatch(props.delete({ id: id, launch: props.launch }));
      onClose();
    } else {
      onClose();
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
});
