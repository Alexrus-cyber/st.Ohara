import styles from "./Card.module.scss";
import { useDispatch } from "react-redux";
import { addItemMenu } from "../../../../slices/menu";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const AddCard = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    dispatch(addItemMenu(acceptedFiles));
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
