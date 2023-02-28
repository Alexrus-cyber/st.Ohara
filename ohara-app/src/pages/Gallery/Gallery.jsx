import styles from './Gallery.module.css'
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import ImageViewer from "react-simple-image-viewer";
import {getGalleryData} from "../../slices/gallery";

export const Gallery = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const dispatch = useDispatch();

    //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
    useEffect(() => {
        dispatch(getGalleryData());
    }, [dispatch])

    const {images, loading} = useSelector(state => state.gallery);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    return (
        loading ? " " :<section className={styles.Gallery}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Наши фотографии</h1>
                    <div className={styles.content}>
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