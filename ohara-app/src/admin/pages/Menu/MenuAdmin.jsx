import styles from "./MenuAdmin.module.scss";
import { AddCard } from "../../components/AddCard/AddCard";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import {
  addItemMenu,
  clearData,
  deleteItemMenu,
  getMenuData,
  swapItemMenu,
} from "../../../slices/menu";
import { Module } from "../../components/Module/Module";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { nanoid } from "@reduxjs/toolkit";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import { ReactSortable } from "react-sortablejs";
import { DragModal } from "../components/DragModal/DragModal";
import { Alert, Snackbar } from "@mui/material";

const initialModalState = {
  src: null,
  id: nanoid(5),
};

const MenuAdmin = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const { items, error, currentPage } = useSelector((state) => state.menu);
  const [isOpenModal, setOpenModal] = useState(false);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuData(currentPage));
  }, [currentPage]);

  const handleClickOpenNews = useCallback((menuData) => {
    setOpenModal(true);
    setModalState(menuData);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
    setChange(false);
    setModalState(initialModalState);
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const sortableOptions = {
    animation: 250,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "images",
    forceFallback: true,
  };

  const listChangeHandler = useCallback(() => {
    setOpenModal(true);
    setChange(true);
  }, []);

  const addItem = useCallback(
    (file) => {
      dispatch(addItemMenu(file));
    },
    [dispatch]
  );
  const reorder = ({ oldIndex, newIndex }) => {
    const result = Array.from(items);
    result[oldIndex] = { ...result[oldIndex], position: newIndex };
    result[newIndex] = { ...result[newIndex], position: oldIndex };
    setData(result);
  };

  const acceptList = useCallback(
    (newState) => {
      dispatch(swapItemMenu(newState));
    },
    [dispatch]
  );
  return (
    <section className={styles.container}>
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(clearData());
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(clearData());
          }}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <h1 className={styles.title}>Меню</h1>
      <div className={styles.addContainer}>
        <AddCard addHandler={addItem} />
      </div>
      <ReactSortable
        onEnd={reorder}
        className={styles.cardContainer}
        list={items.map((element) => ({ ...element }))}
        setList={(currentList, sortable, store) => {
          if (
            store.dragging &&
            store.dragging.props &&
            JSON.stringify(store.dragging.props.list) !==
              JSON.stringify(currentList)
          ) {
            listChangeHandler(currentList);
          }
        }}
        {...sortableOptions}
      >
        {items.map((element, index) => (
          <div key={element.id} className={styles.closeContainer}>
            <LazyLoadImage
              custom={styles.custom}
              imgStyle={styles.custom}
              src={element.file}
              onClick={() => openImageViewer(index)}
              alt=""
            />
            <button
              onClick={() => {
                handleClickOpenNews(element);
              }}
              className={styles.close}
            >
              x
            </button>
          </div>
        ))}
      </ReactSortable>
      {isViewerOpen && (
        <ImageViewer
          src={items.map((e) => e.file)}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      {change && (
        <Module
          active={isOpenModal}
          setActive={setOpenModal}
          onClose={handleClickCloseModal}
        >
          <DragModal
            title={"Вы уверены что хотите поменять местами данные карточки?"}
            setOpenModal={setOpenModal}
            setChange={setChange}
            data={data}
            acceptList={acceptList}
          />
        </Module>
      )}
      {!change && (
        <Module
          active={isOpenModal}
          setActive={setOpenModal}
          onClose={handleClickCloseModal}
        >
          <DeleteModal
            delete={deleteItemMenu}
            id={modalState.id}
            onClose={handleClickCloseModal}
          />
        </Module>
      )}
    </section>
  );
});

export default MenuAdmin;
