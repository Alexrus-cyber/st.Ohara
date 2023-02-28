import styles from "./DeleteModule.module.css";
import React from "react";
import {useDispatch} from "react-redux";

export const DeleteModule = (props) => {
    const dispatch = useDispatch();

    const deleteCard = (yes) => {
        if (yes){
            dispatch(props.delete(props.id))
            props.setActive(false)
        }
        else{
            props.setActive(false)
        }
    }

    return (
        <div className={styles.deleteModule}>
            <h1 className={styles.titleModule}>Вы уверены что хотите удалить?</h1>
            <div className={styles.buttonContainerM}>
                <button className={styles.yes} onClick={() => deleteCard(true)}>Да</button>
                <button className={styles.no} onClick={() => deleteCard(false)}>Нет</button>
            </div>
        </div>
    )
}