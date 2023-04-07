import styles from "./Search.module.css";
import lope from "../../../assets/search.png";

export const Search = () => {
    return (
        <div className={styles.search}>
            <img className={styles.img} src={lope} alt={"lope"}/>
            <input placeholder={"Поиск"} className={styles.input}/>
        </div>
    )
}