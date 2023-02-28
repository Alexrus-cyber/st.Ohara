import styles from './News.module.css'
import {Card} from "./component/Card/Card";
import {Search} from "../../components/Search/Search";
import {useEffect, useState} from "react";
import {Module} from "../../components/Module/Module";
import {ModuleCard} from "./component/ModuleCard/ModuleCard";
import {useDispatch, useSelector} from "react-redux";
import {getNewsData} from "../../../slices/news";

export const NewsAdmin = () => {
    const [active, setActive] = useState(false);
    const {news} = useSelector(state => state.news)
    const [takeCard, setTakeCard] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewsData())
    }, [dispatch]);


    return (
        <div className={styles.container}>
            <Module active={active} setActive={setActive}>
                {news.filter((el) => el.id === takeCard).map(c => <ModuleCard img={c.src} key={c.id} text={c.text}
                                                                              title={c.title}
                                                                              setActive={setActive}/>)}
            </Module>
            <div className={styles.inputContainer}>
                <Search/>
            </div>
            <div className={styles.middle}>
                <div className={styles.newsDate}>
                    <h1 className={styles.title}>Новости</h1>
                    <button className={styles.date}>по дате</button>
                </div>
                <button className={styles.button}>Добавить новость</button>
            </div>
            <div className={styles.cardContainer}>
                {news.map(c => <Card key={c.id} img={c.src} id={c.id} title={c.title} text={c.text} setId={setTakeCard}
                                     setActive={setActive}/>)}
            </div>
        </div>
    )
}