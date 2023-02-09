import styles from './Gallery.module.css'
import {useSelector} from "react-redux";
import React, {useCallback, useState} from "react";
import ImageViewer from "react-simple-image-viewer";

export const Gallery = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {images} = useSelector(state => state.galleryReducer)

    const openImageViewer = useCallback((index) => {
        console.log(index)
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
        console.log(currentImage)
    };


    return (
        <section className={styles.Gallery}>
            <div className={styles.container}>
                <h1 className={styles.title}>Наши фотографии</h1>
                <div>
                    {images.map( i => (
                        <img
                            className={styles.img}
                            src={i.src}
                            onClick={() => openImageViewer(i.id)}
                            key={i.id}
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
                </div>
            </div>
        </section>
    )
}