import styles from './News.module.css'
import {Card} from "./component/Card";
import {Search} from "../../components/Search/Search";
export const NewsAdmin = () => {
    return (
            <div className={styles.container}>
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
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
    )
}