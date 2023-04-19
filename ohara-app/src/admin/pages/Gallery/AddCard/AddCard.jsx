import styles from "./Card.module.scss";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { addItemGallery } from "../../../../slices/gallery";

export const AddCard = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    dispatch(addItemGallery(acceptedFiles));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
  });

  return (
    <div className={styles.card} {...getRootProps()}>
      <input accept="image/*" {...getInputProps()} />
      {isDragActive ? (
        <h1>Вы почти закинули файл 😍😍😍</h1>
      ) : (
        <h1>
          Вы можете закинуть картинку или кликнуть на данную область чтобы
          выбрать файл
          <br />
          😎😎😎
        </h1>
      )}
    </div>
  );
};
