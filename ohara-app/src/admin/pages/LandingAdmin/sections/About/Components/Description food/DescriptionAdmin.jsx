import styles from "../../About.module.css";
import {Field, FieldArray} from "redux-form";
import {InputTitles, TextAreaForm} from "../../../../../Auth/components/Form/FormCreators";

export const DescriptionAdmin = ({img, isLeftPosition, index}) => {
    return (
        <>{
            isLeftPosition ? <div className={styles.itemContainer}>
                <img className={styles.imgRes} src={img} alt="food"/>
                <div className={styles.textContainer}>
                    <Field
                        name={`about.items.${index}.title`}
                        component={InputTitles}
                    />
                    <Field
                        name={`about.items.${index}.text`}
                        component={TextAreaForm}
                    />
                </div>
                <img className={styles.imgRes2} src={img} alt="food"/>
            </div>
            :
            <div className={styles.itemContainer}>
                <img className={styles.img} src={img} alt="food"/>
                <div className={styles.textContainer}>
                    <Field
                        name={`about.items.${index}.title`}
                        component={InputTitles}
                    />
                    <Field
                        name={`about.items.${index}.text`}
                        component={TextAreaForm}
                    />
                </div>
            </div>
        }
        </>
    )
}