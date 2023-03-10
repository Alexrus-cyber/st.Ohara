import styles from './News.module.css'
import {Card} from "./component/Card/Card";
import {Search} from "../../components/Search/Search";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Module} from "../../components/Module/Module";
import {ModuleCard} from "./component/ModuleCard/ModuleCard";
import {useDispatch, useSelector} from "react-redux";
import {getNewsData} from "../../../slices/news";
import {AddModalCard} from "./component/AddModuleCard/AddModalCard";
import {nanoid} from "@reduxjs/toolkit";
import {newsData} from "../../../slices/news/mocks/news";
const initialModalState = {
    img: null,
    text: '',
    title: '',
    id: nanoid(5),
}

export const NewsAdmin = () => {
    const [modalState, setModalState] = useState(initialModalState)
    const [isOpenModal, setOpenModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const {news} = useSelector(state => state.news)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewsData())
    }, [dispatch]);

    const handleClickOpenNews = useCallback((newsData) => {
        setOpenModal(true);
        setModalState(newsData)
        setIsAdd(false)
    }, [])

    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false);
        setModalState(initialModalState)
    }, [])

    const getModalWindow = useMemo(() => {
        const {img, text, title, id} = modalState
        return (
            <Module active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                <ModuleCard img={img} key={id} text={text}
                            title={title}
                            isAdd={isAdd}
                            onClose={handleClickCloseModal}/>
            </Module>
        )
    }, [modalState, isOpenModal, setOpenModal, handleClickCloseModal, isAdd])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <Search/>
                </div>
                <div className={styles.middle}>
                    <div className={styles.newsDate}>
                        <h1 className={styles.title}>Новости</h1>
                        <button className={styles.date}>по дате</button>
                    </div>
                    <button onClick={() => {
                        setOpenModal(true)
                        setIsAdd(true)
                    }} className={styles.button}>Добавить новость
                    </button>
                </div>
                <div className={styles.cardContainer}>
                    {news.map(value => {
                        return (
                            <Card
                                key={value.id}
                                data={value}
                                handleClickItem={() => handleClickOpenNews(value)}
                                setModuleState={setModalState}
                            />
                        )
                    })}
                </div>
            </div>
            {getModalWindow}
        </>
    )
}