import styles from "./AddImage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { editSlider, getFile, setTitle } from "../../../../slices/landing";
import { memo, useCallback, useState } from "react";
import { ButtonUI } from "../../components/ButtonUI/ButtonUI";

export const AddImage = memo(({ onClose }) => {
  const { header } = useSelector((state) => state.landing);
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const fileReader = new FileReader();

  const titleChange = useCallback(
    (e) => {
      if (e.target.value.length >= 0 || e.target.value.length <= 10) {
        dispatch(setTitle(e.target.value));
      }
    },
    [header]
  );
  const PhotoSelected = (e) => {
    if (e.target.files?.length) {
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onloadend = () => {
        setImageUrl(fileReader.result);
        dispatch(
          getFile({
            file: e.target.files[0],
            callback: (result) => {
              setImg(result);
            },
          })
        );
      };
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.containerInput}>
          <p className={styles.titleInput}>Заголовок</p>
          <input
            placeholder={"Заголовок"}
            className={styles.title}
            value={header}
            maxLength={40}
            onChange={titleChange}
          ></input>
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
      <ButtonUI
        onClick={() => {
          dispatch(
            editSlider({
              header,
              idFile: img.id,
            })
          );
          onClose();
        }}
        name={"Создать"}
      />
    </div>
  );
});
