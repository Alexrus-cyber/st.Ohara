import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import {NavLink} from "react-router-dom";

export const Header = () => {
    const arr = [
        {id: 1, text: "Главная", path: '/'},
        {id: 2, text: "Меню", path: '/Menu'},
        {id: 3, text: "Галерея", path: '/Gallery'},
        {id: 4, text: "Новости", path: '/News'},
        {id: 5, text: "Бронирование", path: '/Reservation'},
    ]
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src={logo} alt={"stOhara"}/>
                <div className={styles.middle}>
                    {arr.map(e => <NavLink className={({isActive}) => (isActive ? styles.active : styles.link)} key={e.id} to={e.path}>{e.text}</NavLink>)}
                </div>
            </div>

        </header>
    )
}