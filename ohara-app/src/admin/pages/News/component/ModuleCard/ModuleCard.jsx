import style from './ModuleCard.module.css'

export const ModuleCard = (props) => {

    if (props.isEdit) {
       return (
            <div className={style.container}>
                <div className={style.textContainer}>
                    <h1 className={style.subtitle}>Просмотр и редактирование</h1>
                    <h2 className={style.title}>{props.title}</h2>
                    <p className={style.text}>{props.text}</p>
                    <p className={style.text}>{props.text}</p>
                    <button onClick={props.onClose} className={style.save}>Сохранить</button>
                </div>
                <div className={style.imgContainer}>
                    <div style={{backgroundImage: `url("${props.img}")`}} className={style.imgChanger}>
                        <button className={style.load}>Загрузить</button>
                    </div>
                    <button className={style.delete}>Удалить</button>
                </div>
            </div>
        )
    }

    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h1 className={style.subtitle}>Просмотр и редактирование</h1>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.text}>{props.text}</p>
                <p className={style.text}>{props.text}</p>
                <button onClick={props.onClose} className={style.save}>Сохранить</button>
            </div>
            <div className={style.imgContainer}>
                <div style={{backgroundImage: `url("${props.img}")`}} className={style.imgChanger}>
                    <button className={style.load}>Загрузить</button>
                </div>
                <button className={style.delete}>Удалить</button>
            </div>
        </div>
    )
}