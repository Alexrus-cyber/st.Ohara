import styles from "./MenuAdmin.module.scss";
import { AddCard } from "./AddCard/AddCard";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import { deleteItemMenu, getMenuData } from "../../../slices/menu";
import { Module } from "../../components/Module/Module";
import { DeleteModule } from "../components/DeleteModule/DeleteModule";
import { nanoid } from "@reduxjs/toolkit";
import { Loader } from "../../../components/Loader/Loader";

const initialModalState = {
  src: null,
  id: nanoid(5),
};

export const MenuAdmin = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const { images, loading } = useSelector((state) => state.menu);
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
  return loading ? (
    <Loader />
  ) : (
    <section className={styles.container}>
      <h1 className={styles.title}>Меню</h1>
      <div className={styles.cardContainer}>
        <AddCard />
        {images.map((element, index) => (
          <div key={element.id} className={styles.closeContainer}>
            <img
              className={styles.img}
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
        {isViewerOpen && (
          <ImageViewer
            src={images.map((e) => e.img)}
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
          <DeleteModule
            delete={deleteItemMenu}
            id={modalState.id}
            onClose={handleClickCloseModal}
          />
        </Module>
      </div>
    </section>
  );
};
