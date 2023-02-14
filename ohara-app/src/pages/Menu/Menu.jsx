import React, {useState, useCallback} from 'react';
import ImageViewer from 'react-simple-image-viewer';
import styles from './Menu.module.css'
import {useSelector} from "react-redux";

export const Menu = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {images} = useSelector(state => state.menuReducer)


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
        <section className={styles.menu}>
            <div className={styles.container}>
                <h1 className={styles.title}>Меню</h1>
                <div>
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
                </div>
            </div>
        </section>

    );
}