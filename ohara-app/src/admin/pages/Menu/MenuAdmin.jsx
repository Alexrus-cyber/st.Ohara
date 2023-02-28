import styles from './MenuAdmin.module.css'
import {AddCard} from "./AddCard/AddCard";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import {deleteItemMenu, getMenuData} from "../../../slices/menu";
import {Module} from "../../components/Module/Module";
import {DeleteModule} from "../components/DeleteModule/DeleteModule";

export const MenuAdmin = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [active, setActive] = useState(false);
    const [takeId, setTakeId] = useState(0);
    const {images} = useSelector(state => state.menu)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMenuData())
    },[dispatch]);


    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Меню</h1>
            <div className={styles.cardContainer}>
                    {images.map( i => (
                        <div  key={i.id} className={styles.closeContainer}>
                            <img
                                className={styles.img}
                                src={i.src}
                                onClick={() => openImageViewer(i.id)}
                                width="300"
                                height="200"
                                alt=""
                            />
                            <button onClick={() => {
                                setActive(!active)
                                setTakeId(i.id)
                            }} className={styles.close}>x</button>
                        </div>
                    ))}
                    {isViewerOpen && (
                        <ImageViewer
                            src={images.map(e => e.src)}
                            currentIndex={currentImage}
                            disableScroll={true}
                            closeOnClickOutside={true}
                            onClose={closeImageViewer}
                        />
                    )}
                <AddCard />
                <Module active={active} setActive={setActive}>
                   <DeleteModule delete={deleteItemMenu} id={takeId} active={active} setActive={setActive}/>
                </Module>
            </div>
        </section>
    )
}