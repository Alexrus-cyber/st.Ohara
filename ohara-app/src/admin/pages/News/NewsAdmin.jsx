import styles from './News.module.css'
import {Card} from "./component/Card/Card";
import {Search} from "../../components/Search/Search";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Module} from "../../components/Module/Module";
import {ModuleCard} from "./component/ModuleCard/ModuleCard";
import {useDispatch, useSelector} from "react-redux";
import {getNewsData} from "../../../slices/news";
import {AddModuleCard} from "./component/AddModuleCard/AddModuleCard";
import {nanoid} from "@reduxjs/toolkit";
import {newsData} from "../../../slices/news/mocks/news";
const initialModalState = {
    img: null,
    text: '',
    title: '',
    id: nanoid(5),
}

export const NewsAdmin = () => {
    const [active, setActive] = useState(false);
    const [takeCard, setTakeCard] = useState(0);
    const [add, setAdd] = useState(false)
    const [modalState, setModalState] = useState(initialModalState)
    const [isOpenModal, setOpenModal] = useState(false);

    const {news} = useSelector(state => state.news)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewsData())
    }, [dispatch]);

    const handleClickOpenNews = useCallback((newsData) => {
        setOpenModal(true);
        setModalState(newsData)
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
                            onClose={handleClickCloseModal}/>
            </Module>
        )
    }, [modalState, isOpenModal, setOpenModal])

    return (
        <>
            <div className={styles.container}>
                {/*{add === false*/}
                {/*    ?*/}
                {/*    <Module active={active} setActive={setActive}>*/}
                {/*        {news.filter((el) => el.id === takeCard).map(c => <ModuleCard img={c.src} key={c.id} text={c.text}*/}
                {/*                                                                      title={c.title}*/}
                {/*                                                                      setActive={setActive}/>)}*/}
                {/*    </Module>*/}
                {/*    :*/}
                {/*    <Module active={active} setAdd={setAdd} setActive={setActive}>*/}
                {/*        <AddModuleCard setAdd={setAdd} active={active} setActive={setActive}/>*/}
                {/*    </Module>*/}
                {/*}*/}
                <div className={styles.inputContainer}>
                    <Search/>
                </div>
                <div className={styles.middle}>
                    <div className={styles.newsDate}>
                        <h1 className={styles.title}>Новости</h1>
                        <button className={styles.date}>по дате</button>
                    </div>
                    <button onClick={() => {
                        // setAdd(true)
                        setOpenModal(true)
                    }} className={styles.button}>Добавить новость
                    </button>
                </div>
                <div className={styles.cardContainer}>
                    {/*{news.map(c => <Card key={c.id} img={c.src} id={c.id} title={c.title} text={c.text} setId={setTakeCard}*/}
                    {/*                     setActive={setActive}/>)}*/}
                    {news.map(value => {
                        return (
                            <Card
                                data={value}
                                key={value.id}
                                img={value.src}
                                id={value.id}
                                title={value.title}
                                text={value.text}
                                handleClickItem={() => handleClickOpenNews(value)}
                                setAcive={setModalState}
                            />
                        )
                    })}
                </div>
            </div>
            {getModalWindow}
        </>
    )
}