import styles from "./Gallery.module.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { memo, useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { getGalleryData } from "../../slices/gallery";
import LazyLoadImage from "../../components/LazyLoadImage/LazyLoadImage";

const Gallery = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const dispatch = useDispatch();

  //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
  useEffect(() => {
    dispatch(getGalleryData());
  }, [dispatch]);

  const { items } = useSelector((state) => state.gallery);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <section className={styles.Gallery}>
      <div className={styles.container}>
        <h1 className={styles.title}>Наши фотографии</h1>
        <div className={styles.content}>
          {items.map((i, index) => (
            <div className={styles.img} key={i.id}>
              <LazyLoadImage
                src={i.file}
                custom={styles.border}
                imgStyle={styles.border}
                onClick={() => openImageViewer(index)}
                alt="menu"
              />
            </div>
          ))}
          {isViewerOpen && (
            <ImageViewer
              src={items.map((e) => e.file)}
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
export default Gallery;
