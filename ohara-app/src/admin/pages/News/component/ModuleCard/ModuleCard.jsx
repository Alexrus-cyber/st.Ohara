import style from './ModuleCard.module.css'
import slider from '../../../../../assets/slider1.png'

export const ModuleCard = ({setActive}) => {
    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h1 className={style.subtitle}>Просмотр и редактирование</h1>
                <h2 className={style.title}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. </h2>
                <p className={style.text}>Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest –
                    ausgezeichnet mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift
                    Feinschmecker“ zum Restaurant des Jahres gewählt.</p>
                <p className={style.text}>Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest –
                    ausgezeichnet mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift
                    Feinschmecker“ zum Restaurant des Jahres gewählt.</p>

                <button onClick={()=> setActive(false)} className={style.save}>Сохранить</button>
            </div>
            <div className={style.imgContainer}>
                <div style={{backgroundImage: `url("${slider}")`}} className={style.imgChanger}>
                    <button className={style.load}>Загрузить</button>
                </div>
                <button className={style.delete}>Удалить</button>
            </div>
        </div>
    )
}