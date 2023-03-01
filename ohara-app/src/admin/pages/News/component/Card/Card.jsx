import styles from './Card.module.css'
import close from '../../../../../assets/close.png'
import redact from '../../../../../assets/redact.png'
import {Module} from "../../../../components/Module/Module";
import {useState} from "react";
import {DeleteModule} from "../../../components/DeleteModule/DeleteModule";
import {deleteNew} from "../../../../../slices/news";

export const Card = ({ handleClickItem, img, text, title, id }) => {

    const [active, setActive] = useState(false);

    const check = () => {
        props.setId(id)
        props.setActive(true)
    }
    const moduleDeleteCard = () => {
        setActive(true)
    }

    return (
        <div style={{backgroundImage: `url("${img}")`}} className={styles.card}>
            <div className={styles.container}>
                <div className={styles.closeContainer}>
                    <img className={styles.img} onClick={() => check()}  src={redact} alt={"redact"}/>
                    <img className={styles.img} onClick={() => moduleDeleteCard()} src={close} alt={"close"}/>
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title.substring(0, 30) + "..."}</h2>
                    <p className={styles.text}>{text.substring(0, 80) + "..."}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => handleClickItem()} className={styles.button}>Посмотреть</button>
            </div>
            <Module active={active} setActive={setActive}>
                <DeleteModule delete={deleteNew} id={id} active={active} setActive={setActive}/>
            </Module>
        </div>
    )
}