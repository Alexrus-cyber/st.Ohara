import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Gallery.module.scss";
import ImageViewer from "react-simple-image-viewer";
import {
  addItemGallery,
  deleteItemGallery,
  getGalleryData,
  reOrderList,
} from "../../../slices/gallery";
import { nanoid } from "@reduxjs/toolkit";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { Module } from "../../components/Module/Module";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import { ReactSortable } from "react-sortablejs";
import { DragModal } from "../components/DragModal/DragModal";
import { AddCard } from "../../components/AddCard/AddCard";

const initialModalState = {
  src: null,
  id: nanoid(5),
};

const GalleryAdmin = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState(initialModalState);
  const { images } = useSelector((state) => state.gallery);
  const [isOpenModal, setOpenModal] = useState(false);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
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

  const sortableOptions = {
    animation: 250,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "grid",
    forceFallback: true,
  };

  const listChangeHandler = useCallback((newState) => {
    setOpenModal(true);
    setChange(true);
    setData(newState);
  }, []);

  function acceptList(newState) {
    dispatch(reOrderList(newState));
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Галерея</h1>
      <div className={styles.addContainer}>
        <AddCard addHandler={addItemGallery} />
      </div>
      <ReactSortable
        className={styles.cardContainer}
        list={images.map((element) => ({ ...element }))}
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
      </ReactSortable>
      {isViewerOpen && (
        <ImageViewer
          src={images.map((e) => e.img)}
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
            delete={deleteItemGallery}
            id={modalState.id}
            onClose={handleClickCloseModal}
          />
        </Module>
      )}
    </section>
  );
};
export default GalleryAdmin;
