import styles from "./SliderAdmin.module.scss";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { Module } from "../../components/Module/Module";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSliderItem,
  editSlider,
  getSlider,
} from "../../../slices/landing";
import { Slider } from "../../../pages/Landing/sections/Slider/Slider";
import { AddImage } from "./AddImage/AddImage";

const SliderAdmin = memo(() => {
  const { slider } = useSelector((state) => state.landing);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalState, setModalState] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [del, setDel] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlider());
  }, []);

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
    setDel(false);
    setIsEdit(false);
    setModalState({});
  }, []);

  const getModalWindow = useMemo(() => {
    return (
      <Module
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
        setIsEdit={setIsEdit}
      >
        {isOpenModal ? <AddImage onClose={handleClickCloseModal} /> : ""}
      </Module>
    );
  }, [handleClickCloseModal, isOpenModal]);
  const getModalDeleteWindow = useMemo(() => {
    return (
      <Module
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
      >
        <DeleteModal
          delete={deleteSliderItem}
          id={modalState.id}
          onClose={handleClickCloseModal}
        />
        />
      </Module>
    );
  }, [modalState.id, handleClickCloseModal, isOpenModal]);

  return (
    <div className={styles.container}>
      {slider.length !== 0 && (
        <div style={{ maxWidth: 700, width: "100%", paddingTop: 80 }}>
          <Slider slider={slider} />
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            setOpenModal(true);
            setIsEdit(true);
          }}
        >
          Добавить элемент
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(editSlider(slider))}
        >
          Сохранить
        </button>
      </div>

      <div className={styles.cardContainer}>
        {slider.map((element, index) => (
          <div key={element.id} className={styles.closeContainer}>
            <LazyLoadImage
              custom={styles.custom}
              imgStyle={styles.custom}
              src={element.urlFile}
              onClick={() => openImageViewer(index)}
              alt=""
            />
            <p className={styles.header}>{element.header}</p>
            <button
              onClick={() => {
                handleClickOpenNews(element);
                setDel(true);
              }}
              className={styles.close}
            >
              x
            </button>
          </div>
        ))}
        {isViewerOpen && (
          <ImageViewer
            backgroundStyle={{ zIndex: 1000 }}
            src={slider.map((e) => e.urlFile)}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
        {!del && getModalWindow}
        {!isEdit && getModalDeleteWindow}
      </div>
    </div>
  );
});
export default SliderAdmin;
