import styles from './News.module.css'
import xxx from '../../assets/slider1.png'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

export const News = () => {
    const {news} = useSelector(state => state.newsReducer);

    return (
        <section className={styles.news}>
            <div className={styles.container}>
                <h1 className={styles.title}>Новости</h1>
                {
                    news.filter(e => e.main === true).map(e =>
                    <NavLink key={e.id} className={styles.mainNew} to={"/new"}>
                        <h1 className={styles.textImg}>Главная новость</h1>
                        <img className={styles.mainImg} src={xxx} alt={"xxx"}/>
                        <p className={styles.data}>22.22.2022</p>
                    </NavLink>)
                }
                <div className={styles.gallery}>
                    <div className={styles.content}>
                        {
                            news.filter(e => e.main !== true).map(e =>
                            <NavLink to={"/new"} key={e.id} className={styles.secondNews}>
                                <p className={styles.text}>Новость</p>
                                <img className={styles.img} src={xxx} alt={"xxx"}/>
                            </NavLink>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}