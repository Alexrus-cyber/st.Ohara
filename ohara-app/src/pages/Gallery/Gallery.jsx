import styles from "./Gallery.module.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { memo, useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { getGalleryData } from "../../slices/gallery";
import LoadableImage from "../../components/LoadableImage/LoadableImage";

const Gallery = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const dispatch = useDispatch();

  //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
  useEffect(() => {
    dispatch(getGalleryData());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const { images } = useSelector((state) => state.gallery);

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
          {images.map((i, index) => (
            <LoadableImage
              key={index}
              src={i.img}
              onClick={() => openImageViewer(index)}
              alt="gallery"
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
export default Gallery;
