import styles from './Gallery.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {gallerySlice} from "./slice";

export const Gallery = () => {
    const {images} = useSelector(state => state.galleryReducer);
    const [active, setActive] = useState(true);
    const dispatch = useDispatch();

    const Activator = (id) => {
        setActive(!active)
        const image = {
            id: id,
            activator: active,
        }
        dispatch(gallerySlice.actions.activatorImages(image))
    }
    return (
        <section className={styles.Gallery}>
            <div className={styles.container}>
                <h1 className={styles.title}>Наши фотографии</h1>
                <div className={styles.gallery}>
                    <div className={styles.content}>
                        {images.map(a => <img key={a.id}
                                                  onClick={() => Activator(a.id, active)}
                                                  className={a.activate ? styles.active : styles.img} src={a.src}
                                                  alt={"random"}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}