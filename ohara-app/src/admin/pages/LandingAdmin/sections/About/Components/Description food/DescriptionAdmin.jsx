import styles from "../../About.module.scss";
import { Field } from "redux-form";
import {
  FilesInput,
  InputUI,
} from "../../../../../Auth/components/Form/FormCreators";
import { memo } from "react";
import { getFile } from "../../../../../../../slices/landing";

export const DescriptionAdmin = memo(({ img, isLeftPosition, index, id }) => {
  return (
    <>
      {!isLeftPosition && (
        <div className={styles.itemContainer}>
          <div className={styles.imgContainerLeftMobile}>
            <Field
              name={`image`}
              getFile={getFile}
              section={"about"}
              id={id}
              circle={true}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt="food" />
          </div>

          <div className={styles.textContainer}>
            <Field
              name={`aboutDto.${index}.header`}
              title={"Заголовок"}
              component={InputUI}
              typeInput={"input"}
            />
            <Field
              name={`aboutDto.${index}.description`}
              component={InputUI}
              title={"Текст"}
              typeInput={"text"}
            />
          </div>
          <div className={styles.imgContainerLeft}>
            <Field
              name={`image`}
              getFile={getFile}
              section={"about"}
              circle={true}
              id={id}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt="food" />
          </div>
        </div>
      )}

      {isLeftPosition && (
        <div className={styles.itemContainer}>
          <div className={styles.imgContainerRight}>
            <Field
              name={`about.items.${index}.img`}
              getFile={getFile}
              section={"about"}
              circle={true}
              id={id}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt="food1" />
          </div>
          <div className={styles.textContainer}>
            <Field
              name={`aboutDto.${index}.header`}
              component={InputUI}
              title={"Заголовок"}
              typeInput={"input"}
            />
            <Field
              name={`aboutDto.${index}.description`}
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
