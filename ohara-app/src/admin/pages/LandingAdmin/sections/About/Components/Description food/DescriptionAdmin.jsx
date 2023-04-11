import styles from "../../About.module.css";
import {Field} from "redux-form";
import {FilesInput, InputUI} from "../../../../../Auth/components/Form/FormCreators";
import {memo, useState} from "react";

export const DescriptionAdmin = memo(({img, isLeftPosition, index, id}) => {

    const [imageUrl, setImageUrl] = useState(img);


    return (
        <>{
            isLeftPosition ? <div className={styles.itemContainer}>
                    <div className={styles.imgContainer2}>
                        <Field
                            name={`about.items.${index}.img`}
                            type={'file'}
                            setImageUrl={setImageUrl}
                            id={id}
                            component={FilesInput}
                        />
                        <img className={styles.imgRes} src={img} alt="food"/>
                    </div>

                <div className={styles.textContainer}>
                    <Field
                        name={`about.items.${index}.title`}
                        title={"Заголовок"}
                        component={InputUI}
                        typeInput={'input'}
                    />
                    <Field
                        name={`about.items.${index}.text`}
                        component={InputUI}
                        title={"Текст"}
                        typeInput={'text'}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Field
                        name={`about.items.${index}.img`}
                        type={'file'}
                        setImageUrl={setImageUrl}
                        id={id}
                        component={FilesInput}
                    />
                    <img className={styles.imgRes} src={img} alt="food"/>
                </div>

            </div>
            :
            <div className={styles.itemContainer}>
                <div className={styles.imgContainer3}>
                    <Field
                        name={`about.items.${index}.img`}
                        type={'file'}
                        setImageUrl={setImageUrl}
                        id={id}
                        component={FilesInput}
                    />
                    <img className={styles.imgRes} src={img} alt="food1"/>
                </div>
                <div className={styles.textContainer}>
                    <Field
                        name={`about.items.${index}.title`}
                        component={InputUI}
                        title={"Заголовок"}
                        typeInput={'input'}
                    />
                    <Field
                        name={`about.items.${index}.text`}
                        component={InputUI}
                        title={"Текст"}
                        typeInput={'text'}
                    />
                </div>
            </div>
        }
        </>
    )
})