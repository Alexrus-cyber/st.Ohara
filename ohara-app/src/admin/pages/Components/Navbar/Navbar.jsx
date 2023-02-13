import styles from './Navbar.module.css';
import admin from '../../../../assets/admin.png'

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>St.O'hara</h1>
            <img className={styles.img} src={admin} alt={"admin"}/>
            <p className={styles.name}>Анастасия Михайлова</p>
            <p className={styles.position}>Официант</p>
            <div className={styles.links}>
                <p className={styles.link}>Меню</p>
                <p className={styles.link}>Новости</p>
                <p className={styles.link}>Бронирование</p>
            </div>
        </div>
    )
}