import styles from "../../Atmosphere.module.css";
import {InputUI, TextAreaForm} from "../../../../../Auth/components/Form/FormCreators";
import {Field} from "redux-form";

export const ContentAdmin = ({img, title, text1, index, isLeftPosition}) => {
    return (
        <>
            {!isLeftPosition ?
                <div className={styles.itemContainer}>
                    <img className={styles.imgRes} src={img} alt={"barman"}/>
                    <div className={styles.backContainer}>
                        <img className={styles.img} src={img} alt={"barman"}/>
                        <div className={styles.back}></div>
                    </div>
                    <div className={styles.textContainer}>
                        <Field
                            name={`atmosphere.content.${index}.title`}
                            component={InputUI}
                            title={"Заголовок"}
                            typeInput={"input"}
                        />
                        <Field
                            name={`atmosphere.content.${index}.text1`}
                            component={InputUI}
                            title={"Текст"}
                            typeInput={"text"}
                        />
                    </div>
                </div>
                :
                <div className={styles.itemContainer}>
                    <img className={styles.img1} src={img} alt={"barman"}/>
                    <div className={styles.textContainer}>
                        <Field
                            name={`atmosphere.content.${index}.title`}
                            component={InputUI}
                            title={"Заголовок"}
                            typeInput={"input"}
                        />
                        <Field
                            name={`atmosphere.content.${index}.text1`}
                            component={InputUI}
                            title={"Текст"}
                            typeInput={"text"}
                        />
                    </div>
                    <div className={styles.backContainer}>
                        <img className={styles.img2} src={img} alt={"barman"}/>
                        <div className={isLeftPosition === 0 ? styles.back : styles.backRevert}></div>
                    </div>
                </div>
            }
        </>
    )
}