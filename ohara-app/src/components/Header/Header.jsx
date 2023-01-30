import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import {useEffect, useState} from "react";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 800) {
                setScrolled(true);
                if (window.scrollY > 2400){
                    setScrolled(false);
                }
            }
            else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (
        <header className={scrolled ? styles.headerActive : styles.header}>
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