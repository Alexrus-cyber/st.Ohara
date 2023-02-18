import styles from './Navbar.module.css';
import admin from '../../../../assets/admin.png'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    const arr = [
        {id: 1, src: "/menuAdmin", text: "Меню"},
        {id: 2, src: "/newsAdmin", text: "Новости"},
        {id: 3, src: "/galleryAdmin", text: "Галерея"},
        {id: 4, src: "/reservationAdmin", text: "Бронирование"},

    ]
    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>St.O'hara</h1>
            <img className={styles.img} src={admin} alt={"admin"}/>
            <p className={styles.name}>Анастасия Михайлова</p>
            <p className={styles.position}>Официант</p>
            <div className={styles.links}>
                {arr.map(e =>  <NavLink key={e.id} to={e.src} className={({isActive}) => (isActive ? styles.active : styles.link)}>{e.text}</NavLink>)}
            </div>
        </div>
    )
}