import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './Gallery.module.scss'
import ImageViewer from "react-simple-image-viewer";
import {AddCard} from "./AddCard/AddCard";
import {deleteItemGallery, getGalleryData} from "../../../slices/gallery";
import {nanoid} from "@reduxjs/toolkit";
import {DeleteModule} from "../components/DeleteModule/DeleteModule";
import {Module} from "../../components/Module/Module";
import {Loader} from "../../../components/Loader/Loader";

const initialModalState = {
    src: null,
    id: nanoid(5),
}

export const GalleryAdmin = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [modalState, setModalState] = useState(initialModalState)
    const {images, loading} = useSelector(state => state.gallery)
    const [isOpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
    useEffect(() => {
        dispatch(getGalleryData())
    }, [dispatch])

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
        setModalState(menuData)
    }, [])

    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false);
        setModalState(initialModalState)
    }, [])


    return (
        loading
            ? <Loader/>
            : <section className={styles.container}>
                <h1 className={styles.title}>Галерея</h1>
                <div className={styles.cardContainer}>
                    {images.map((element, index) => (
                        <div key={element.id} className={styles.closeContainer}>
                            <img
                                className={styles.img}
                                src={element.img}
                                onClick={() => openImageViewer(index)}
                                alt=""
                            />
                            <button onClick={() => {
                                handleClickOpenNews(element)
                            }} className={styles.close}>x
                            </button>
                        </div>
                    ))}
                    {isViewerOpen && (
                        <ImageViewer
                            src={images.map(e => e.img)}
                            currentIndex={currentImage}
                            disableScroll={true}
                            closeOnClickOutside={true}
                            onClose={closeImageViewer}
                        />
                    )}
                    <AddCard/>
                    <Module active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                        <DeleteModule delete={deleteItemGallery} id={modalState.id} onClose={handleClickCloseModal}/>
                    </Module>
                </div>
            </section>
    )
}