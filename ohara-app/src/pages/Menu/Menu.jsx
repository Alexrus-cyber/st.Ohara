import styles from './Menu.module.css'
import drinks1 from '../../assets/MenuDrinks1.jpg'
import drinks2 from '../../assets/Drinks2.jpg'
import drinks3 from '../../assets/Drinks3.jpg'

export const Menu = () => {

    return (
        <section className={styles.menu}>
            <div className={styles.container}>
                <h1 className={styles.title}>Меню</h1>
                <div className={styles.links}>
                    <p className={styles.link}>Горячая еда</p>
                    <p className={styles.link}>Напитки</p>
                </div>
                <div className={styles.gallery} >
                    <div className={styles.content}>
                        <img className={styles.img} src={drinks1} alt={"dsds"}/>
                        <img className={styles.img} src={drinks2} alt={"dsds"}/>
                        <img className={styles.img} src={drinks3} alt={"dsds"}/>
                    </div>

                </div>
            </div>

        </section>
    )
}