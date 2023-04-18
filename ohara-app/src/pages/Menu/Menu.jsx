import React, { useState, useCallback, useEffect, memo } from "react";
import ImageViewer from "react-simple-image-viewer";
import styles from "./Menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMenuData, listImagesSelector } from "../../slices/menu";
import LoadableImage from "../../components/LoadableImage/LoadableImage";

const Menu = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const dispatch = useDispatch();
  //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
  useEffect(() => {
    dispatch(getMenuData());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const images = useSelector(listImagesSelector);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <section className={styles.menu}>
      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <div className={styles.content}>
          {images.map((i, index) => (
            <LoadableImage
              key={i.id}
              src={i.img}
              onClick={() => openImageViewer(index)}
              alt="menu"
            />
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
        </div>
      </div>
    </section>
  );
});

export default Menu;
