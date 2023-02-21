import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import styles from './Gallery.module.css'
import ImageViewer from "react-simple-image-viewer";
import {AddCard} from "../components/AddCard/AddCard";

export const GalleryAdmin = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {images} = useSelector(state => state.galleryReducer)


    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Галерея</h1>
            <div className={styles.cardContainer}>
                {images.map( i => (
                    <img
                        className={styles.img}
                        src={i.src}
                        onClick={() => openImageViewer(i.id)}
                        width="300"
                        key={i.id}
                        style={{margin: '50px'}}
                        alt=""
                    />
                ))}
                {isViewerOpen && (
                    <ImageViewer
                        src={images.map(e => e.src)}
                        currentIndex={currentImage}
                        disableScroll={true}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                    />
                )}
                <AddCard />
            </div>
        </section>
    )
}