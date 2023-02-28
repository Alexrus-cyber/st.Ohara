import styles from './News.module.css'
import xxx from '../../assets/slider1.png'
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import {getNewsData} from "../../slices/news";

export const News = () => {
    const {news} = useSelector(state => state.news);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNewsData())
    }, [dispatch]);


    return (
        <section className={styles.news}>
            <div className={styles.container}>
                <h1 className={styles.title}>Новости</h1>
                {
                    news.filter(e => e.main === true).map(e =>
                        <NavLink key={e.id} className={styles.mainNew} to={"/new/" + e.id}>
                            <h1 className={styles.textImg}>Главная новость</h1>
                            <img className={styles.mainImg} src={xxx} alt={"xxx"}/>
                            <p className={styles.data}>22.22.2022</p>
                        </NavLink>)
                }
                <div className={styles.gallery}>
                    <div className={styles.content}>
                        {
                            news.filter(e => e.main !== true).map(e =>
                                <NavLink to={`/new/` + e.id} key={e.id} className={styles.secondNews}>
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