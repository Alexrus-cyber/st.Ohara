import styles from "./Card.module.scss";
import redact from "../../../../../assets/redact.png";
import { Module } from "../../../../components/Module/Module";
import React, { memo, useCallback, useMemo, useState } from "react";
import { DeleteModule } from "../../../components/DeleteModule/DeleteModule";
import { deleteNew } from "../../../../../slices/news";

export const Card = memo(
  ({ handleClickItem, data, setModuleState, setIsEdit }) => {
    const [isOpenModal, setOpenModal] = useState(false);

    const handleClickOpenNews = useCallback(() => {
      setOpenModal(true);
    }, []);

    const handleClickCloseModal = useCallback(() => {
      setOpenModal(false);
    }, []);

    const getModalWindow = useMemo(() => {
      return (
        <Module
          active={isOpenModal}
          setActive={setOpenModal}
          onClose={handleClickCloseModal}
        >
          <DeleteModule
            delete={deleteNew}
            id={data.id}
            onClose={handleClickCloseModal}
          />
          />
        </Module>
      );
    }, [data.id, handleClickCloseModal, isOpenModal]);
    return (
      <div
        style={{ backgroundImage: `url("${data.img}")` }}
        className={styles.card}
      >
        <div className={styles.container}>
          <div className={styles.closeContainer}>
            <img
              className={styles.img}
              onClick={() => {
                handleClickItem();
                setModuleState(data);
              }}
              src={redact}
              alt={"redact"}
            />
            <button
              onClick={() => {
                handleClickOpenNews();
              }}
              className={styles.close}
            >
              x
            </button>
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              {data.title.substring(0, 30) + "..."}
            </h2>
            <p className={styles.text}>{data.text.substring(0, 80) + "..."}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              handleClickItem();
              setModuleState(data);
              setIsEdit(true);
            }}
            className={styles.button}
          >
            Посмотреть
          </button>
        </div>
        {getModalWindow}
      </div>
    );
  }
);