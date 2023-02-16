import styles from './News.module.css'
import {Card} from "./component/Card/Card";
import {Search} from "../../components/Search/Search";
import {useState} from "react";
import {Module} from "../../components/Module/Module";
import {ModuleCard} from "./component/ModuleCard/ModuleCard";
export const NewsAdmin = () => {
    const [active, setActive] = useState(false);
    return (
            <div className={styles.container}>
                <Module active={active} setActive={setActive}>
                    <ModuleCard setActive={setActive}/>
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
                    <Card setActive={setActive}/>
                    <Card setActive={setActive}/>
                    <Card setActive={setActive}/>
                    <Card setActive={setActive}/>
                    <Card setActive={setActive}/>
                    <Card setActive={setActive}/>
                </div>
            </div>
    )
}