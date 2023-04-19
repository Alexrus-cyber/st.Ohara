import styles from "./MenuAdmin.module.scss";
import { AddCard } from "./AddCard/AddCard";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import { deleteItemMenu, getMenuData, reOrderList } from "../../../slices/menu";
import { Module } from "../../components/Module/Module";
import { DeleteModule } from "../components/DeleteModule/DeleteModule";
import { nanoid } from "@reduxjs/toolkit";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import { ReactSortable } from "react-sortablejs";

const initialModalState = {
  src: null,
  id: nanoid(5),
};

const MenuAdmin = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const { images } = useSelector((state) => state.menu);
  const [isOpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuData());
  }, [dispatch]);

  const handleClickOpenNews = useCallback((menuData) => {
    setOpenModal(true);
    setModalState(menuData);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
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
    group: "grid",
    forceFallback: true,
  };

  const listChangeHandler = useCallback((newState) => {
    dispatch(reOrderList(newState));
  }, []);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Меню</h1>
      <AddCard />
      {images && (
        <ReactSortable
          className={styles.cardContainer}
          list={images.map((x) => ({ ...x }))}
          setList={(newState) => listChangeHandler(newState)}
          {...sortableOptions}
        >
          {images.map((element, index) => (
            <div key={element.id} className={styles.closeContainer}>
              <LazyLoadImage
                custom={styles.custom}
                imgStyle={styles.custom}
                src={element.img}
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
          <Module
            active={isOpenModal}
            setActive={setOpenModal}
            onClose={handleClickCloseModal}
          >
            <DeleteModule
              delete={deleteItemMenu}
              id={modalState.id}
              onClose={handleClickCloseModal}
            />
          </Module>
        </ReactSortable>
      )}
      {isViewerOpen && (
        <ImageViewer
          src={images.map((e) => e.img)}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </section>
  );
});

export default MenuAdmin;
