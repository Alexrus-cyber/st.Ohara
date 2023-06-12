import styles from "../Menu.module.scss";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import ImageViewer from "react-simple-image-viewer";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMenuSelector } from "../../../slices/menu";
import { LoaderPage } from "../../../components/LoaderPage/LoaderPage";

export const ChildrenMenu = ({ getMenu }) => {
  const items = useSelector(listMenuSelector);
  const { loading } = useSelector((state) => state.menu);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const dispatch = useDispatch();

  //делаем запрос на получение файлов в нашем случае картинки из моков вытаскиваем
  useEffect(() => {
    dispatch(getMenu());
    window.scrollTo(0, 0);
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  if (loading) {
    return <LoaderPage height={true} />;
  }

  return (
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
  );
};
