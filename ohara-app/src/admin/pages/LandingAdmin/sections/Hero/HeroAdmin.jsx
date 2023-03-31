import styles from "./Hero.module.css"
import arrows from "../../../../../assets/down-arrow 1.png"
import {FieldCreator, InputTitles, TextAreaForm} from "../../../Auth/components/Form/FormCreators";
import {Required} from "../../../Auth/components/Validators/Validators";
import {maxLength100} from "../../../Auth/components/Constant";


export const HeroAdmin = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.text}>
                    { FieldCreator(100, 'hero.title',
                        'Заголовок',
                        [Required, maxLength100],
                        InputTitles,
                        styles.title)}
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={arrows} alt={"arrow"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}