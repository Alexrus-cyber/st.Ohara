import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Gallery.module.scss";
import ImageViewer from "react-simple-image-viewer";
import {
  addItemGallery,
  deleteItemGallery,
  getGalleryData,
} from "../../../slices/gallery";
import { nanoid } from "@reduxjs/toolkit";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { Module } from "../../components/Module/Module";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import { AddCard } from "../../components/AddCard/AddCard";

const initialModalState = {
  src: null,
  id: nanoid(5),
};

const GalleryAdmin = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const { items } = useSelector((state) => state.gallery);
  const [isOpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
  useEffect(() => {
    dispatch(getGalleryData());
  }, [dispatch]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleClickOpenNews = useCallback((menuData) => {
    setOpenModal(true);
    setModalState(menuData);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
    setModalState(initialModalState);
  }, []);

  const addItem = useCallback(
    (file) => {
      dispatch(addItemGallery(file));
    },
    [dispatch]
  );

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Галерея</h1>
      <div className={styles.addContainer}>
        <AddCard addHandler={addItem} />
      </div>
      <div className={styles.cardContainer}>
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
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={items.map((e) => e.file)}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      <Module
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
      >
        <DeleteModal
          delete={deleteItemGallery}
          id={modalState.id}
          onClose={handleClickCloseModal}
        />
      </Module>
    </section>
  );
};
export default GalleryAdmin;
