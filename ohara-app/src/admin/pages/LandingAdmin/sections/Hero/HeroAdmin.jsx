import styles from "./Hero.module.scss";
import {
  FilesInput,
  InputUI,
} from "../../../Auth/components/Form/FormCreators";
import { Required } from "../../../Auth/components/Validators/Validators";
import { maxLength100 } from "../../../Auth/components/Constant";
import { Field } from "redux-form";
import { getFile } from "../../../../../slices/landing";

export const HeroAdmin = ({ hero }) => {
  return (
    <section
      style={{ backgroundImage: `url(${hero.urlFile})` }}
      className={styles.hero}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <Field
            name={"bannerDto.header"}
            title={"Главный заголовок"}
            placeholder={"Заголовок"}
            validate={[Required, maxLength100]}
            component={InputUI}
            typeInput={"text"}
          />
          <div className={styles.imgContainer}>
            <Field
              name={`image1`}
              getFile={getFile}
              section={"hero"}
              component={FilesInput}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
