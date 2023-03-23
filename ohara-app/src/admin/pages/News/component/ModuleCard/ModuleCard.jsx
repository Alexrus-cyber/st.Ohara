import style from './ModuleCard.module.css'
import {AddModalCard} from "../AddModuleCard/AddModalCard";
import {useState} from "react";

export const ModuleCard = ({data,onClose, isAdd}) => {
    const [isEdit, setIsEdit] = useState(false);

    if (isAdd || isEdit) {
       return (
            <AddModalCard onClose={onClose} data = {data} isEdit={isEdit} setIsEdit={setIsEdit}/>
        )
    }

    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h1 className={style.subtitle}>Просмотр и редактирование</h1>
                <h2 className={style.title}>{data.title}</h2>
                <p className={style.text}>{data.text}</p>
                <p className={style.text}>{data.text}</p>
                <button onClick={() => setIsEdit(true)}>Редактирование</button>
                <button onClick={onClose} className={style.save}>Сохранить</button>
            </div>
            <div className={style.imgContainer}>
                <div style={{backgroundImage: `url("${data.img}")`}} className={style.imgChanger}>
                    <button className={style.load}>Загрузить</button>
                </div>
                <button className={style.delete}>Удалить</button>
            </div>
        </div>
    )
}