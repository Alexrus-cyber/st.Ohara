import styles from './Menu.module.css'
import {menuSlice} from "./slice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export const Menu = () => {
    const {images, imagesFood, isFood} = useSelector(state => state.menuReducer);
    const dispatch = useDispatch();
    const [active, setActive] = useState(true);
    const [food, setFood] = useState(true);

    const Activator = (id) => {
        setActive(!active)
        const image = {
            id: id,
            activator: active,
        }
        dispatch(menuSlice.actions.activatorImages(image))
    }

    const ActivatorFood = (id) => {
        setFood(!food)
        const image = {
            id: id,
            activator: food,
        }
        dispatch(menuSlice.actions.activatorImagesFood(image))
    }

    return (
        <section className={styles.menu}>
            <div className={styles.container}>
                <h1 className={styles.title}>Меню</h1>
                <div className={styles.links}>
                    <p className={isFood ? styles.linkActive : styles.link}
                       onClick={() => dispatch(menuSlice.actions.ChangeFood(true))}>Горячая еда</p>
                    <p className={isFood ? styles.link : styles.linkActive}
                       onClick={() => dispatch(menuSlice.actions.ChangeFood(false))}>Напитки</p>
                </div>
                {isFood ?
                    <div className={styles.gallery}>
                        <div className={styles.content}>
                            {imagesFood.map(a => <img key={a.id}
                                                      onClick={() => ActivatorFood(a.id, food)}
                                                      className={a.activate ? styles.active : styles.img} src={a.src}
                                                      alt={"random"}/>)}
                        </div>
                    </div>
                    :
                    <div className={styles.gallery}>
                        <div className={styles.content}>
                            {images.map(a => <img key={a.id}
                                                  onClick={() => Activator(a.id, active)}
                                                  className={a.activate ? styles.active : styles.img} src={a.src}
                                                  alt={"random"}/>)}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}