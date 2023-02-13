import styles from './Navbar.module.css';
import admin from '../../../../assets/admin.png'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>St.O'hara</h1>
            <img className={styles.img} src={admin} alt={"admin"}/>
            <p className={styles.name}>Анастасия Михайлова</p>
            <p className={styles.position}>Официант</p>
            <div className={styles.links}>
                <NavLink to={"/menuAdmin"} className={styles.link}>Меню</NavLink>
                <NavLink to={"/NewsAdmin"} className={styles.link}>Новости</NavLink>
                <NavLink to={"/ReservationAdmin"} className={styles.link}>Бронирование</NavLink>
            </div>
        </div>
    )
}