import styles from "./About.module.css"
import arrows from "../../assets/down-arrow 1.png"

export const About = () => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1>Может быть о нас?</h1>
                <div>
                    <img/>
                    <div>
                        <p>О чем то?</p>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                </div>
            </div>
        </section>
    )
}