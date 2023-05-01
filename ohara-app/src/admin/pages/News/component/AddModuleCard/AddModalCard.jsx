import styles from "./AddModalCard.module.scss";
import { memo, useEffect, useMemo, useState } from "react";
import {
  addNew,
  editNew,
  setTextR,
  setTitleR,
} from "../../../../../slices/news";
import { useDispatch, useSelector } from "react-redux";

export const AddModalCard = memo(({ onClose, data, isEdit, setIsEdit }) => {
  const { header, description } = useSelector((state) => state.news);
  const [img, setImg] = useState(data.file);
  const [url, setUrl] = useState(data.idFile);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const fileReader = new FileReader();

  const titleChange = (e) => {
    dispatch(setTitleR(e.currentTarget.value));
  };
  const onChanged = (e) => {
    dispatch(setTextR(e.currentTarget.value));
  };
  const PhotoSelected = (e) => {
    if (e.target.files?.length) {
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onloadend = () => {
        setImageUrl(fileReader.result);
        setImg(e.target.files[0]);
        setUrl(null);
      };
    }
  };

  useEffect(() => {
    if (data.header) {
      dispatch(setTitleR(data.header));
      dispatch(setTextR(data.description));
    } else {
      dispatch(setTitleR(""));
      dispatch(setTextR(""));
    }
  }, [dispatch, data.header, data.description]);
  console.log(data);

  const editCard = useMemo(() => {
    if (isEdit) {
      return (
        <div className={styles.container}>
          <div className={styles.two}>
            <div className={styles.textContainer}>
              <label className={styles.containerInput}>
                <p className={styles.titleInput}>Заголовок</p>
                <input
                  placeholder={"Заголовок"}
                  className={styles.title}
                  value={header}
                  onChange={titleChange}
                ></input>
              </label>
              <label className={styles.containerInput}>
                <p className={styles.titleText}>Текст</p>
                <textarea
                  placeholder={"Текст"}
                  className={styles.text}
                  value={description}
                  onChange={onChanged}
                ></textarea>
              </label>
            </div>
            <div className={styles.imgContainer}>
              <div
                style={{
                  backgroundImage: `url("${imageUrl ? imageUrl : img}")`,
                }}
                className={styles.imgChanger}
              >
                <label className={styles.label}>
                  <input
                    type={"file"}
                    className={styles.input}
                    onChange={PhotoSelected}
                  ></input>
                  <span className={styles.imageEdit}>Загрузить</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => {
                onClose();
                setIsEdit(false);
                dispatch(
                  editNew({
                    id: data.id,
                    header,
                    description,
                    idFile: url,
                    file: img,
                  })
                );
              }}
              className={styles.save}
            >
              Сохранить
            </button>
            <button className={styles.save}>Удалить</button>
          </div>
        </div>
      );
    }
  }, [isEdit, header, description, img, onClose, setIsEdit]);

  const addNewsCard = useMemo(() => {
    if (!isEdit) {
      return (
        <div className={styles.container}>
          <div className={styles.two}>
            <div className={styles.textContainer}>
              <label className={styles.containerInput}>
                <p className={styles.titleInput}>Заголовок</p>
                <input
                  placeholder={"Заголовок"}
                  className={styles.title}
                  value={header}
                  onChange={titleChange}
                ></input>
              </label>
              <label className={styles.containerInput}>
                <p className={styles.titleText}>Текст</p>
                <textarea
                  placeholder={"Текст"}
                  className={styles.text}
                  value={description}
                  onChange={onChanged}
                ></textarea>
              </label>
            </div>
            <div className={styles.imgContainer}>
              <div
                style={{ backgroundImage: `url("${imageUrl}")` }}
                className={styles.imgChanger}
              >
                <label className={styles.label}>
                  <input
                    type={"file"}
                    className={styles.input}
                    onChange={PhotoSelected}
                  ></input>
                  <span className={styles.imageEdit}>Загрузить</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => {
                const news = {
                  file: img,
                  header,
                  description,
                };
                dispatch(addNew(news));
                onClose();
                setIsEdit(false);
              }}
              className={styles.save}
            >
              Сохранить
            </button>
          </div>
        </div>
      );
    }
  }, [
    data.file,
    dispatch,
    img,
    isEdit,
    onClose,
    setIsEdit,
    header,
    description,
  ]);
  return (
    <>
      {editCard}
      {addNewsCard}
    </>
  );
});
