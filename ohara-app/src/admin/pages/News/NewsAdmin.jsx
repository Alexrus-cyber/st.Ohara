import styles from "./News.module.scss";
import { Card } from "./component/Card/Card";
import { Search } from "../../components/Search/Search";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Module } from "../../components/Module/Module";
import { useDispatch, useSelector } from "react-redux";
import { getNewsData, setSearchValue } from "../../../slices/news";
import { AddModalCard } from "./component/AddModuleCard/AddModalCard";
import { nanoid } from "@reduxjs/toolkit";
import { UseDebounce } from "../../hoocks/UseDebounce";

const initialModalState = {
  img: null,
  text: "",
  title: "",
  id: nanoid(5),
};

export const NewsAdmin = () => {
  const [modalState, setModalState] = useState(initialModalState);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");
  const { news, searchValue } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);

  const handleClickOpenNews = useCallback((newsData) => {
    setOpenModal(true);
    setModalState(newsData);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
    setModalState(initialModalState);
  }, []);
  const getModalWindow = useMemo(() => {
    return (
      <Module
        title={isEdit ? "Изменение новости" : "Создание новости"}
        setIsEdit={setIsEdit}
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
      >
        {isOpenModal ? (
          <AddModalCard
            onClose={handleClickCloseModal}
            data={modalState}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        ) : (
          ""
        )}
      </Module>
    );
  }, [handleClickCloseModal, isEdit, isOpenModal, modalState]);

  const makeRequest = UseDebounce((value) => {
    dispatch(setSearchValue(value));
  }, 300);

  const handleChange = (element) => {
    const { value } = element.target;
    makeRequest(value);
    setText(value);

    if (value === "") {
      dispatch(getNewsData());
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.secondContainer}>
          <div className={styles.middle}>
            <div className={styles.newsDate}>
              <h1 className={styles.title}>Новости</h1>
              <button className={styles.date}>по дате</button>
            </div>
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className={styles.button}
            >
              Добавить новость
            </button>
          </div>
          <div className={styles.inputContainer}>
            <Search
              value={text}
              placeholder={"Поиск"}
              onChange={handleChange}
            />
          </div>
          <div className={styles.cardContainer}>
            {news
              .filter((item) => {
                return searchValue.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchValue) ||
                      item.title.includes(searchValue);
              })
              .map((value) => {
                return (
                  <Card
                    key={value.id}
                    data={value}
                    handleClickItem={() => handleClickOpenNews(value)}
                    setModuleState={setModalState}
                    setIsEdit={setIsEdit}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {getModalWindow}
    </>
  );
};
