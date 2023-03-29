import styles from './AddModalCard.module.css'
import {useEffect, useMemo, useState} from "react";
import {addNew} from "../../../../../slices/news";
import {useDispatch} from "react-redux";

export const AddModalCard = ({onClose, data, isEdit, setIsEdit}) => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
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
    useEffect(() => {
        setTitle(data.title)
        setText(data.text)
    }, [data.title, data.text]);


    const editCard = useMemo(() => {
        if (isEdit) {
            return (
                <div className={styles.container}>
                    <div className={styles.two}>
                        <div className={styles.textContainer}>
                            <label className={styles.containerInput}>
                                <p className={styles.titleInput}>Заголовок</p>
                                <input placeholder={"Заголовок"} className={styles.title} value={title} onChange={titleChange}></input>
                            </label>
                            <label className={styles.containerInput}>
                                <p className={styles.titleText}>Текст</p>
                                <textarea placeholder={"Текст"}  className={styles.text} value={text} onChange={onChanged}></textarea>
                            </label>

                        </div>
                        <div className={styles.imgContainer}>
                            <div style={{backgroundImage: `url("${data.img}")`}} className={styles.imgChanger}>
                                <label className={styles.label}>
                                    <input type={"file"} className={styles.input} onChange={PhotoSelected}></input>
                                    <span className={styles.imageEdit}>Загрузить</span>
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => {
                            onClose()
                            setIsEdit(false)
                        }} className={styles.save}>Сохранить
                        </button>
                        <button className={styles.save}>Удалить</button>
                    </div>
                </div>
            )
        }
    }, [isEdit, title, text, data.img, onClose, setIsEdit])


    const addNewsCard = useMemo(() => {
        if (!isEdit) {
            return (
                <div className={styles.container}>
                    <div className={styles.two}>
                        <div className={styles.textContainer}>
                            <input placeholder={"Заголовок"} className={styles.title} value={title} onChange={titleChange}></input>
                            <textarea placeholder={"Текст"}  className={styles.text} value={text} onChange={onChanged}></textarea>
                        </div>
                        <div className={styles.imgContainer}>
                            <div style={{backgroundImage: `url("${data.img}")`}} className={styles.imgChanger}>
                                <label className={styles.label}>
                                    <input type={"file"} className={styles.input} onChange={PhotoSelected}></input>
                                    <span className={styles.imageEdit}>Загрузить</span>
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => {
                            const news = {
                                id: 10,
                                img: "",
                                title: title,
                                text: text
                            }

                            dispatch(addNew(news))
                            onClose()
                            setIsEdit(false)
                            setTitle("");
                            setText("")
                        }} className={styles.save}>Сохранить
                        </button>
                    </div>
                </div>
            )
        }

    }, [data.img, dispatch, isEdit, onClose, setIsEdit, text, title])
    return (
        <>
            {editCard}
            {addNewsCard}
        </>
    )
}