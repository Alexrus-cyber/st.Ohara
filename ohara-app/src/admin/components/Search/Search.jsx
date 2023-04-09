import styles from "./Search.module.css";
import lope from "../../../assets/search.png";

export const Search = ({onChange, placeholder , value}) => {
    return (
        <div className={styles.search}>
            <img className={styles.img} src={lope} alt={"lope"}/>
            <input onChange={onChange} placeholder={placeholder} value={value} className={styles.input}/>
        </div>
    )
}