import styles from "./FormCreators.module.scss";
import { Field } from "redux-form";
import { useDispatch } from "react-redux";
import { memo, useCallback, useState } from "react";
import cl from "classnames";
import { CloudUpload, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { MenuItem, TextField } from "@mui/material";
import { setFile } from "../../../../../slices/landing";

const currencies = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
];

export const InputUI = memo(
  ({
    input: { value, onChange },
    input,
    meta: { error, warning, touched },
    placeholder,
    title,
    typeInput,
    type,
    ...props
  }) => {
    const showError = touched && error;
    const [visible, setVisible] = useState(false);
    return (
      <div
        className={cl({
          [styles.text]: typeInput !== "reg",
        })}
      >
        <div className={styles.containerInput}>
          {value !== "" && typeInput !== "checkBox" && (
            <p className={styles.titleInput}>{title}</p>
          )}
          {typeInput === "text" && (
            <textarea
              placeholder={title}
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
          {typeInput === "material" && (
            <TextField
              style={{ width: "220px" }}
              variant={"standard"}
              label={placeholder}
              placeholder={placeholder}
              {...input}
              {...props}
            />
          )}
          {typeInput === "materialPhone" && (
            <TextField
              style={{ width: "220px" }}
              variant={"standard"}
              placeholder={placeholder}
              label={placeholder}
              onClick={() => {
                if (value === "") {
                  onChange((value = "+7"));
                }
              }}
              onMouseLeave={() => {
                if (value === "") {
                  onChange((value = "+7"));
                }
              }}
              onMouseOver={() => {
                if (value === "") {
                  onChange((value = "+7"));
                }
              }}
              {...input}
              {...props}
            />
          )}
          {typeInput === "checkBox" && (
            <input
              style={{ width: 20, height: 20 }}
              type={"checkbox"}
              {...input}
              {...props}
            />
          )}
          {typeInput === "materialPicker" && (
            <TextField
              style={{ width: "220px", zIndex: 20000000 }}
              variant={"standard"}
              select
              defaultValue={1}
              label={placeholder}
              placeholder={placeholder}
              {...input}
              {...props}
            >
              {currencies.map((option) => (
                <MenuItem
                  style={{ zIndex: 20000000 }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          {typeInput === "materialDate" && (
            <input
              type={"datetime-local"}
              className={cl(styles.datePicker, {
                [styles.datePickerError]: showError,
              })}
              {...input}
              {...props}
            />
          )}
          {typeInput === "materialTime" && (
            <input
              type={"time"}
              step={3600000}
              className={cl(styles.datePicker, {
                [styles.datePickerError]: showError,
              })}
              {...input}
              {...props}
            />
          )}
          {typeInput === "reg" && (
            <div className={styles.passwordBox}>
              <input
                className={cl(styles.input, {
                  [styles.inputError]: showError,
                })}
                type={visible && type === "password" ? "text" : type}
                {...input}
                {...props}
              />
              {type === "password" && (
                <div className={styles.eyes}>
                  {visible ? (
                    <Visibility onClick={() => setVisible(false)} />
                  ) : (
                    <VisibilityOff onClick={() => setVisible(true)} />
                  )}
                </div>
              )}
            </div>
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
        </div>
        <div style={{ maxWidth: "200px" }}>
          {touched &&
            ((error && <span className={styles.error}>{error}</span>) ||
              (warning && <span className={styles.warning}>{warning}</span>))}
        </div>
      </div>
    );
  }
);

export const FilesInput = memo(({ name, id, section, getFile, circle }) => {
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
        dispatch(
          getFile({
            file: acceptedFiles[0],
            callback: (result) => {
              dispatch(setFile({ result, id, section }));
            },
          })
        );
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
});

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
