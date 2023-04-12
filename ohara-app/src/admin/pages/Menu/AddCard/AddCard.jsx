import styles from './Card.module.scss'
import {useDispatch} from "react-redux";
import {addItemMenu} from "../../../../slices/menu";

export const AddCard = () => {
    const dispatch = useDispatch();

    const PhotoSelected = (e) => {
        if (e.target.files?.length) {
            dispatch(addItemMenu(e.target.files[0]))
        }
    }

    return (
        <div onClick={PhotoSelected} className={styles.card}>
             <input type={"file"} className={styles.input} onChange={PhotoSelected}></input>
             <span className={styles.imageEdit}>+</span>
        </div>
    )
}