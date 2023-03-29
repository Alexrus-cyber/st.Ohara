import styles from './News.module.css'
import {Card} from "./component/Card/Card";
import {Search} from "../../components/Search/Search";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Module} from "../../components/Module/Module";
import {useDispatch, useSelector} from "react-redux";
import {getNewsData} from "../../../slices/news";
import {AddModalCard} from "./component/AddModuleCard/AddModalCard";
import {nanoid} from "@reduxjs/toolkit";

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
    const [isEdit, setIsEdit] = useState(false);

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
        return (
            <Module title = {isEdit ? "Изменение новости" : "Создание новости"} setIsEdit={setIsEdit} active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                {isOpenModal ?  <AddModalCard onClose={handleClickCloseModal} data = {modalState} isEdit={isEdit} setIsEdit={setIsEdit}/> : ""}
            </Module>
        )
    }, [handleClickCloseModal, isEdit, isOpenModal, modalState])

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
                                setIsEdit={setIsEdit}
                            />
                        )
                    })}
                </div>
            </div>
            {getModalWindow}
        </>
    )
}