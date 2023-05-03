import styles from "../../Atmosphere.module.scss";
import {
  FilesInput,
  InputUI,
} from "../../../../../Auth/components/Form/FormCreators";
import { Field } from "redux-form";
import { getFile } from "../../../../../../../slices/landing";
import cl from "classnames";

export const ContentAdmin = ({ img, index, isLeftPosition, id }) => {
  return (
    <>
      {!isLeftPosition ? (
        <div className={styles.itemContainer}>
          <div className={styles.backContainer}>
            <Field
              name={`atmosphereDto.${index}.idFile`}
              id={id}
              getFile={getFile}
              section={"atmosphere"}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt={"barman"} />
            <div className={styles.back}></div>
          </div>
          <div className={styles.textContainer}>
            <Field
              name={`atmosphereDto.${index}.header`}
              component={InputUI}
              title={"Заголовок"}
              typeInput={"input"}
            />
            <Field
              name={`atmosphereDto.${index}.description`}
              component={InputUI}
              title={"Текст"}
              typeInput={"text"}
            />
            <Field
              name={`atmosphereDto.${index}.isLeftPosition`}
              component={InputUI}
              typeInput={"checkBox"}
              type={"checkbox"}
            />
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer}>
          <div className={styles.backContainerMobile}>
            <Field
              name={`atmosphereDto.${index}.idFile`}
              id={id}
              getFile={getFile}
              section={"atmosphere"}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt={"barman"} />
            <div
              className={cl(styles.backRevert, {
                [styles.back]: !isLeftPosition,
              })}
            ></div>
          </div>
          <div className={styles.textContainer}>
            <Field
              name={`atmosphereDto.${index}.header`}
              component={InputUI}
              title={"Заголовок"}
              typeInput={"input"}
            />
            <Field
              name={`atmosphereDto.${index}.description`}
              component={InputUI}
              title={"Текст"}
              typeInput={"text"}
            />
            <Field
              name={`atmosphereDto.${index}.isLeftPosition`}
              component={InputUI}
              typeInput={"checkBox"}
              type={"checkbox"}
            />
          </div>
          <div className={styles.backContainerRight}>
            <Field
              name={`atmosphereDto.${index}.idFile`}
              id={id}
              getFile={getFile}
              section={"atmosphere"}
              component={FilesInput}
            />
            <img className={styles.img} src={img} alt={"barman"} />
            <div
              className={cl(styles.backRevert, {
                [styles.back]: !isLeftPosition,
              })}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
