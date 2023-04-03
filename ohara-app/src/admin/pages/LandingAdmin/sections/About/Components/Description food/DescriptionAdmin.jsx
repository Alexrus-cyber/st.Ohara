import styles from "../../About.module.css";
import {Field} from "redux-form";
import {FileInput, InputTitles, TextAreaForm} from "../../../../../Auth/components/Form/FormCreators";

export const DescriptionAdmin = ({img, isLeftPosition, index}) => {
    const onChange = e => {
        e.preventDefault();
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0]);
    };
    return (
        <>{
            isLeftPosition ? <div className={styles.itemContainer}>
                <img className={styles.imgRes} src={img} alt="food"/>
                    <Field
                        name={`photo`}
                        type={'file'}
                        label={'Upload your photo'}
                        component={FileInput}
                    />
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
                <Field
                    name={`about.items.${index}.img`}
                    type={'file'}
                    label={'Upload your photo'}
                    component={FileInput}
                    onChange={onChange}
                />
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