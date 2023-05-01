import styles from "./DragModal.module.scss";
import React, { memo } from "react";

export const DragModal = memo(
  ({ data, acceptList, setOpenModal, setChange, title }) => {
    return (
      <div className={styles.deleteModule}>
        <h1>{title}</h1>
        <div className={styles.buttonContainerM}>
          <button
            className={styles.yes}
            onClick={() => {
              acceptList(data);
              setOpenModal(false);
              setChange(false);
            }}
          >
            Да
          </button>
          <button
            className={styles.no}
            onClick={() => {
              setOpenModal(false);
              setChange(false);
            }}
          >
            Нет
          </button>
        </div>
      </div>
    );
  }
);
