import styles from './Menu.module.css'
import {menuSlice} from "../../slices/menu";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export const Menu = () => {

    const {images} = useSelector(state => state.menuReducer);
    const dispatch = useDispatch();
    const [active, setActive] = useState(true);
    const [number, setNumber] = useState(1);

    const Activator = (id) => {
        setActive(!active);
        setNumber(id);
        const image = {
            id: id,
            activator: active,
        }
        console.log(number)
        dispatch(menuSlice.actions.activatorImages(image))
    }

    const Next = () => {
        if (number < images.length) {
            const image = {
                id: number + 1,
                activator: true,
            }
            const pastPicture = {
                id: number,
                activator: false
            }

            dispatch(menuSlice.actions.activatorImages(pastPicture))
            dispatch(menuSlice.actions.NextImage(image))
            setNumber(number + 1)
            console.log(number)
        }
    }

    const Back = () => {
        if (number > 1) {
            const image = {
                id: number - 1,
                activator: true,
            }
            const pastPicture = {
                id: number,
                activator: false
            }
            dispatch(menuSlice.actions.activatorImages(pastPicture))
            dispatch(menuSlice.actions.NextImage(image))
            setNumber(number - 1)
            console.log(number)
        }
    }

    return (
        <section className={styles.menu}>
            <div className={styles.container}>
                <h1 className={styles.title}>Меню</h1>
                <div className={styles.gallery}>
                    <div className={styles.content}>
                        {active === false
                            ?
                            images.map(a => <div key={a.id} className={styles.xxx}>
                                <img onClick={() => Activator(a.id, active)}
                                     className={a.activate ? styles.active : styles.img} src={a.src}
                                     alt={"random"}/>
                                <button onClick={() => Back(a.id)} className={styles.leftBars}></button>
                                <button onClick={() => Next(a.id)} className={styles.rightBars}></button>
                            </div>)
                            :
                            images.map(a => <img key={a.id}
                                                 onClick={() => Activator(a.id, active)}
                                                 className={a.activate ? styles.active : styles.img} src={a.src}
                                                 alt={"random"}/>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}