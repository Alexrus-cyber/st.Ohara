import style from './AddModuleCard.module.css'

export const AddModuleCard = (props) => {
    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h1 className={style.subtitle}>Создание новости</h1>
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