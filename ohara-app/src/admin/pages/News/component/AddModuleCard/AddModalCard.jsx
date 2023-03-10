import styles from './AddModalCard.module.css'
import {useMemo, useState} from "react";
import {addNew} from "../../../../../slices/news";
import {useDispatch} from "react-redux";

export const AddModalCard = (props) => {
    const [text, setText] = useState(props.isEdit ? props.data.text : "");
    const [title, setTitle] = useState(props.isEdit ? props.data.title : "");
    const dispatch = useDispatch()

    const titleChange = (e) => {
        setTitle(e.currentTarget.value)
    }
    const onChanged = (e) => {
        setText(e.currentTarget.value)
    }
    const PhotoSelected = (e) => {
        if (e.target.files?.length) {

        }
    }

    const editCard = useMemo(() => {
        if (props.isEdit) {
            return (
                <div className={styles.container}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.subtitle}>Изменения новости</h1>
                        <input className={styles.title} value={title} onChange={titleChange}></input>
                        <textarea className={styles.text} value={text} onChange={onChanged}></textarea>
                        <button onClick={() => {
                            props.onClose()
                        }} className={styles.save}>Сохранить
                        </button>
                    </div>
                    <div className={styles.imgContainer}>
                        <div style={{backgroundImage: `url("${props.data.img}")`}} className={styles.imgChanger}>
                            <label className={styles.label}>
                                <input type={"file"} className={styles.input} onChange={PhotoSelected}></input>
                                <span className={styles.imageEdit}>Загрузить</span>
                            </label>
                        </div>
                        {props.isEdit ? <button className={styles.delete}>Удалить</button> : ""}
                    </div>
                </div>
            )
        }
    }, [props, title, text, dispatch])


    const addNewsCard = useMemo(() => {
        if (!props.isEdit) {
            return (
                <div className={styles.container}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.subtitle}>Создание новости</h1>
                        <input className={styles.title} value={title} onChange={titleChange}></input>
                        <textarea className={styles.text} value={text} onChange={onChanged}></textarea>
                        <button onClick={() => {
                            const news = {
                                id: 10,
                                img: "",
                                title: title,
                                text: text
                            }

                            dispatch(addNew(news))
                            props.onClose()
                        }} className={styles.save}>Сохранить
                        </button>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.imgChanger}>
                            <label className={styles.label}>
                                <input type={"file"} className={styles.input} onChange={PhotoSelected}></input>
                                <span className={styles.imageEdit}>Загрузить</span>
                            </label>
                        </div>
                        {props.isEdit ? <button className={styles.delete}>Удалить</button> : ""}
                    </div>
                </div>
            )
        }

    }, [props, text, title, dispatch])
    return (
        <>
            {editCard}
            {addNewsCard}
        </>
    )
}