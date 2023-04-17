import styles from "../../About.module.scss";
import { Field } from "redux-form";
import {
  FilesInput,
  InputUI,
} from "../../../../../Auth/components/Form/FormCreators";
import { memo, useState } from "react";
import { getFile } from "../../../../../../../slices/landing";

export const DescriptionAdmin = memo(({ img, isLeftPosition, index, id }) => {
  const [imageUrl, setImageUrl] = useState(img);

  return (
    <>
      {!isLeftPosition && (
        <div className={styles.itemContainer}>
          <div className={styles.imgContainerLeftMobile}>
            <Field
              name={`about.items.${index}.img`}
              type={"file"}
              setImageUrl={setImageUrl}
              getFile={getFile}
              section={"about"}
              id={id}
              component={FilesInput}
            />
            <img className={styles.img} src={imageUrl} alt="food" />
          </div>

          <div className={styles.textContainer}>
            <Field
              name={`about.items.${index}.title`}
              title={"Заголовок"}
              component={InputUI}
              typeInput={"input"}
            />
            <Field
              name={`about.items.${index}.text`}
              component={InputUI}
              title={"Текст"}
              typeInput={"text"}
            />
          </div>
          <div className={styles.imgContainerLeft}>
            <Field
              name={`about.items.${index}.img`}
              type={"file"}
              setImageUrl={setImageUrl}
              getFile={getFile}
              section={"about"}
              id={id}
              component={FilesInput}
            />
            <img className={styles.img} src={imageUrl} alt="food" />
          </div>
        </div>
      )}

      {isLeftPosition && (
        <div className={styles.itemContainer}>
          <div className={styles.imgContainerRight}>
            <Field
              name={`about.items.${index}.img`}
              type={"file"}
              setImageUrl={setImageUrl}
              getFile={getFile}
              section={"about"}
              id={id}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt="food1" />
          </div>
          <div className={styles.textContainer}>
            <Field
              name={`about.items.${index}.title`}
              component={InputUI}
              title={"Заголовок"}
              typeInput={"input"}
            />
            <Field
              name={`about.items.${index}.text`}
              component={InputUI}
              title={"Текст"}
              typeInput={"text"}
            />
          </div>
        </div>
      )}
    </>
  );
});
