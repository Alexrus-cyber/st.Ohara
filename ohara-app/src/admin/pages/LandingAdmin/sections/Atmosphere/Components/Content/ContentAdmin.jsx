import styles from "../../Atmosphere.module.css";
import {FilesInput, InputUI} from "../../../../../Auth/components/Form/FormCreators";
import {Field} from "redux-form";
import {useState} from "react";
import {getFile} from "../../../../../../../slices/landing";

export const ContentAdmin = ({img,index, isLeftPosition, id}) => {

    const [imageUrl, setImageUrl] = useState(img);

    return (
        <>
            {!isLeftPosition ?
                <div className={styles.itemContainer}>
                    <div className={styles.backContainer}>
                        <Field
                            name={`atmosphere.content.${index}.img`}
                            type={'file'}
                            setImageUrl={setImageUrl}
                            id={id}
                            getFile={getFile}
                            section={'atmosphere'}
                            component={FilesInput}
                        />
                        <img className={styles.img} src={imageUrl} alt={"barman"}/>
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
                    <div className={styles.backContainer2}>
                        <Field
                            name={`atmosphere.content.${index}.img`}
                            type={'file'}
                            setImageUrl={setImageUrl}
                            id={id}
                            getFile={getFile}
                            section={'atmosphere'}
                            component={FilesInput}
                        />
                        <img className={styles.img} src={imageUrl} alt={"barman"}/>
                        <div className={isLeftPosition === 0 ? styles.back : styles.backRevert}></div>
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
                    <div className={styles.backContainerRight}>
                        <Field
                            name={`atmosphere.content.${index}.img`}
                            type={'file'}
                            setImageUrl={setImageUrl}
                            id={id}
                            getFile={getFile}
                            section={'atmosphere'}
                            component={FilesInput}
                        />
                        <img className={styles.img} src={imageUrl} alt={"barman"}/>
                        <div className={isLeftPosition === 0 ? styles.back : styles.backRevert}></div>
                    </div>
                </div>
            }
        </>
    )
}