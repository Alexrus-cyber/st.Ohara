import styles from './Card.module.css'
import {useDispatch} from "react-redux";
import {addItemMenu} from "../../../../slices/menu";
import x from '../../../../assets/barman.png'

export const AddCard = (props) => {
    const dispatch = useDispatch();

    const AddItem = () => {
        const image = {
            id: 100,
            src: x,
        }
        dispatch(addItemMenu(image))
    }

    return (
        <div onClick={AddItem} className={styles.card}>
            <div  className={styles.plus}>+</div>
        </div>
    )
}