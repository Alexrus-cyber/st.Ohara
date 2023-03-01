import style from './AddModuleCard.module.css'
import {useMemo} from "react";

export const AddModuleCard = (props) => {

    const subtitle = useMemo(() => {
        if (props.isEdit) {
            return 'Изменение новости'
        }
        return 'Создание новости'
    }, [props.isEdit])
    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h1 className={style.subtitle}>{subtitle}</h1>
                <input className={style.title}></input>
                <textarea className={style.text}></textarea>
                <button onClick={()=> {
                    props.setActive(false)
                    props.setAdd(false)
                }} className={style.save}>Сохранить</button>
            </div>
            <div className={style.imgContainer}>
                <div className={style.imgChanger}>
                    <button className={style.load}>Загрузить</button>
                </div>
                <button className={style.delete}>Удалить</button>
            </div>
        </div>
    )
}