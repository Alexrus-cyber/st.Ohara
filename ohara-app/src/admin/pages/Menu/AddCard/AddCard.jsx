import styles from "./Card.module.scss";
import { useDispatch } from "react-redux";
import { addItemMenu } from "../../../../slices/menu";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const AddCard = () => {
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const dispatch = useDispatch();
  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      setIsFileTooLarge(true);
    }
    if (acceptedFiles[0].size < maxSize || acceptedFiles.length > 0) {
      dispatch(addItemMenu(acceptedFiles));
      setIsFileTooLarge(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
        "image/webp": [],
        "image/gif": [],
      },
      minSize: 0,
      maxSize,
      multiple: false,
    });
  return (
    <div className={styles.card} {...getRootProps()}>
      <input onDrop={onDrop} accept="image/*" {...getInputProps()} />
      {isDragActive && !isDragReject && <h1>Вы почти закинули файл 😍😍😍</h1>}
      {!isDragActive && (
        <h1>
          Вы можете закинуть картинку или кликнуть на данную область чтобы
          выбрать файл
          <br />
          ...
        </h1>
      )}
      {isDragReject && <h1>Нельзя закидывать такой файл 💀💀💀</h1>}
      <div className={styles.error}>
        {isFileTooLarge && (
          <h1 style={{ color: "red" }}>
            Этот файл слишком большого размера 💀💀💀
          </h1>
        )}
      </div>
    </div>
  );
};
