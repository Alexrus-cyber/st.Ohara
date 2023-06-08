import styles from "./Card.module.scss";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "@mui/icons-material";

export const AddCard = ({ upload, addHandler }) => {
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      setIsFileTooLarge(true);
    }
    if (acceptedFiles[0].size < maxSize || acceptedFiles.length > 0) {
      if (upload) {
        upload(acceptedFiles);
      }
      if (addHandler) {
        addHandler(acceptedFiles);
      }
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
      multiple: true,
    });
  return (
    <div className={styles.card} {...getRootProps()}>
      <input onDrop={onDrop} {...getInputProps()} />
      <span className={styles.span}>
        <CloudUpload />
        {isDragActive && !isDragReject && (
          <p style={{ fontSize: 12 }}>В процессе 😍😍😍</p>
        )}
        {isDragReject && (
          <p style={{ color: "red", fontSize: 12, textAlign: "center" }}>
            Нельзя закидывать такой файл 💀💀💀
          </p>
        )}
        {!isDragActive && !isFileTooLarge && (
          <p className={styles.p}>Загрузить</p>
        )}
        {isFileTooLarge && !isDragActive && (
          <p style={{ color: "red", fontSize: 12, textAlign: "center" }}>
            Этот файл слишком большого размера <br />
            или
            <br />
            Данный тип файла не поддерживается сайтом
            <br /> 💀💀💀
          </p>
        )}
      </span>
    </div>
  );
};
