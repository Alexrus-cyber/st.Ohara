import React, {useState, useCallback, useEffect} from 'react';
import ImageViewer from 'react-simple-image-viewer';
import styles from './Menu.module.css'
import {useDispatch, useSelector} from "react-redux";
import {clearData, getMenuData, listImagesSelector} from "../../slices/menu";

export const Menu = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const dispatch = useDispatch();

    //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
    useEffect(() => {
        dispatch(getMenuData());
    }, [dispatch])

    const images = useSelector(listImagesSelector);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    //пример как юзать экшены
    const handleClickClearImages = () => {
        dispatch(clearData())
    }

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
                {images.length ? <button onClick={handleClickClearImages}>Удалить меню</button> : null}
            </div>
        </section>

    );
}