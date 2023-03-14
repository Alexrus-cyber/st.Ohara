import styles from "./Hero.module.css"
import arrows from "../../../../assets/down-arrow 1.png"

export const Hero = ({hero}) => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <p className={styles.title}>{hero.title}</p>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={arrows} alt={"arrow"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}