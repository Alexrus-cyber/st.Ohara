import styles from "./Hero.module.scss"
import arrows from "../../../../../assets/down-arrow 1.png"
import {InputUI} from "../../../Auth/components/Form/FormCreators";
import {Required} from "../../../Auth/components/Validators/Validators";
import {maxLength100} from "../../../Auth/components/Constant";
import {Field} from "redux-form";


export const HeroAdmin = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <Field name={'hero.title'} title={"Главный заголовок"} placeholder={"Заголовок"}
                           validate={[Required, maxLength100]} component={InputUI} typeInput={'input'}/>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={arrows} alt={"arrow"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}