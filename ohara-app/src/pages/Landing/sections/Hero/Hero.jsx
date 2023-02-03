import styles from "./Hero.module.css"
import arrows from "../../../../assets/down-arrow 1.png"

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <p>Вкусное мясо, отличный виски,
                        хорошее пиво и приятная атмосфера!</p>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={arrows} alt={"arrow"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}