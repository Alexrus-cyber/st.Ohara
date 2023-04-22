import styles from "./FormCreators.module.scss";
import { Field } from "redux-form";
import { useDispatch } from "react-redux";
import { memo, useCallback, useState } from "react";
import cl from "classnames";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

export const InputUI = memo(
  ({
    input: { value },
    input,
    meta: { error, warning, touched },
    title,
    typeInput,
    ...props
  }) => {
    const showError = touched && error;

    return (
      <div
        className={cl({
          [styles.text]: typeInput !== "reg",
        })}
      >
        <label className={styles.containerInput}>
          {value !== "" && <p className={styles.titleInput}>{title}</p>}
          {typeInput === "text" && (
            <textarea
              className={cl(styles.textArea, {
                [styles.textAreaError]: showError,
              })}
              {...input}
              {...props}
            />
          )}
          {typeInput === "input" && (
            <input
              placeholder={"Заголовок"}
              className={cl(styles.inputTitle, {
                [styles.inputTitleEr]: showError,
              })}
              {...input}
              {...props}
            />
          )}
          {typeInput === "reg" && (
            <input
              className={cl(styles.input, {
                [styles.inputError]: showError,
              })}
              {...input}
              {...props}
            />
          )}
          {typeInput === "select" && (
            <select
              className={cl(styles.input, {
                [styles.inputError]: showError,
              })}
              {...input}
              {...props}
            >
              <option>Admin</option>
              <option>Employee</option>
            </select>
          )}
        </label>
        <div>
          {touched &&
            ((error && <span className={styles.error}>{error}</span>) ||
              (warning && <span className={styles.warning}>{warning}</span>))}
        </div>
      </div>
    );
  }
);

export const FilesInput = memo(
  ({ name, setImageUrl, id, getFile, section, circle }) => {
    const fileReader = new FileReader();
    const dispatch = useDispatch();
    const [isFileTooLarge, setIsFileTooLarge] = useState(false);
    const maxSize = 1048576;

    const onDrop = useCallback((acceptedFiles) => {
      if (!acceptedFiles.length) {
        setIsFileTooLarge(true);
      }
      if (acceptedFiles[0].size < maxSize || acceptedFiles.length > 0) {
        fileReader.readAsDataURL(acceptedFiles[0]);
        fileReader.onloadend = () => {
          setImageUrl(fileReader.result);
          dispatch(getFile({ id, file: fileReader.result, section }));
        };
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
      <div
        {...getRootProps()}
        className={cl(styles.label, {
          [styles.circle]: circle,
        })}
      >
        <input
          {...getInputProps()}
          className={styles.file}
          name={name}
          onDrop={onDrop}
        />
        <span className={styles.span}>
          <CloudUpload />
          {isDragActive && !isDragReject && (
            <p style={{ fontSize: 12 }}>Вы почти закинули файл 😍😍😍</p>
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
              Данный тип файла не поддерживается разработчиком
              <br /> 💀💀💀
            </p>
          )}
        </span>
      </div>
    );
  }
);

export const FieldCreator = (
  keyId,
  name,
  placeholder,
  validators,
  component,
  className,
  type,
  typeInput
) => {
  return (
    <div
      key={keyId}
      className={cl({
        [className]: className,
      })}
    >
      <Field
        name={name}
        placeholder={placeholder}
        validate={validators}
        component={component}
        typeInput={typeInput}
        title={""}
        type={type}
      />
    </div>
  );
};
