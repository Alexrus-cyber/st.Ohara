import styles from "../../Atmosphere.module.scss";
import {FilesInput, InputUI} from "../../../../../Auth/components/Form/FormCreators";
import {Field} from "redux-form";
import {useState} from "react";
import {getFile} from "../../../../../../../slices/landing";
import cl from 'classnames'

export const ContentAdmin = ({img, index, isLeftPosition, id}) => {

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
                    <div className={styles.backContainerMobile}>
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
                        <div className={cl(styles.backRevert, {
                            [styles.back]: !isLeftPosition
                        })}></div>
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
                        <div className={cl(styles.backRevert, {
                            [styles.back]: !isLeftPosition
                        })}></div>
                    </div>
                </div>
            }
        </>
    )
}