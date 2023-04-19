import styles from "./FormCreators.module.scss";
import { Field } from "redux-form";
import { useDispatch } from "react-redux";
import { memo } from "react";
import cl from "classnames";
import { CloudUpload } from "@mui/icons-material";

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
  ({ type, name, setImageUrl, id, getFile, section }) => {
    const fileReader = new FileReader();
    const dispatch = useDispatch();

    fileReader.onloadend = () => {
      setImageUrl(fileReader.result);
      dispatch(getFile({ id, file: fileReader.result, section }));
    };

    const onChange = (e) => {
      const file = e.target.files[0];
      /*    dispatch( getFile(file)) ;*/
      fileReader.readAsDataURL(file);
      e.target.files = null;
    };
    return (
      <div>
        <label className={styles.label}>
          <input
            onChange={onChange}
            className={styles.file}
            placeholder={"Заголовок"}
            type={type}
            name={name}
            accept={"image/*"}
          />
          <span className={styles.span}>
            <CloudUpload />
            <p className={styles.p}>Загрузить</p>
          </span>
        </label>
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
