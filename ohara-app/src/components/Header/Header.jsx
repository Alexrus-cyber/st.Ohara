import styles from "./Header.module.css"
import logo from "../../assets/logo.png"

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src={logo} alt={"stOhara"}/>
                <div className={styles.middle}>
                    <p>Главная</p>
                    <p>Меню</p>
                    <p>О нас</p>
                    <p>Новости</p>
                    <p>Бронирование</p>
                </div>
            </div>

        </header>
    )
}