import styles from "./About.module.css"
import {DescriptionAdmin} from "./Components/Description food/DescriptionAdmin";

export const AboutAdmin = ({about}) => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.title}>Может быть о нас?</h1>
                {about.items.map(a => <DescriptionAdmin key={a.id} text={a.text} title={a.title} img={a.img} isLeftPosition={a.isLeftPosition}/>)}
            </div>
        </section>
    )
}