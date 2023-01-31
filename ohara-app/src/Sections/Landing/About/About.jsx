import styles from "./About.module.css"
import {Description} from "./Components/Description food/Description";
import {DescritionFoodArr} from "./Contstants";

export const About = () => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.title}>Может быть о нас?</h1>
                {DescritionFoodArr.map(a => <Description key={a.id} text={a.text} title={a.title} img={a.img} left={a.left}/>)}
            </div>
        </section>
    )
}